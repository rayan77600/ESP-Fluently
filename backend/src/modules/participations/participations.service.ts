import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Participation,
  ParticipationStatus,
} from '../../entities/participation.entity';
import { Event } from '../../entities/event.entity';
import { UpdateParticipationDto } from './dto/update-participation.dto';

@Injectable()
export class ParticipationsService {
  constructor(
    @InjectRepository(Participation)
    private participationRepository: Repository<Participation>,

    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async joinEvent(eventId: number, userId: number) {
    // Vérifier que l'événement existe
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['participations'],
    });
    if (!event) throw new NotFoundException(`Événement #${eventId} non trouvé`);

    // L'hôte ne peut pas participer à son propre événement
    if (event.hostId === userId) {
      throw new ForbiddenException('Vous êtes l\'hôte de cet événement');
    }

    // Vérifier si déjà inscrit
    const existing = await this.participationRepository.findOne({
      where: { eventId, userId },
    });
    if (existing) {
      throw new ConflictException('Vous avez déjà demandé à participer à cet événement');
    }

    // Vérifier la capacité max
    const acceptedCount = event.participations.filter(
      (p) => p.status === ParticipationStatus.ACCEPTED,
    ).length;
    if (acceptedCount >= event.maxParticipants) {
      throw new ForbiddenException('L\'événement est complet');
    }

    const participation = this.participationRepository.create({
      eventId,
      userId,
      status: ParticipationStatus.PENDING,
    });

    return this.participationRepository.save(participation);
  }

  async getEventParticipations(eventId: number) {
    return this.participationRepository.find({
      where: { eventId },
      relations: ['user'],
    });
  }

  async getMyParticipations(userId: number) {
    return this.participationRepository.find({
      where: { userId },
      relations: ['event', 'event.host', 'event.eventLanguages', 'event.eventLanguages.language'],
    });
  }

  async updateStatus(
    participationId: number,
    updateDto: UpdateParticipationDto,
    hostId: number,
  ) {
    const participation = await this.participationRepository.findOne({
      where: { id: participationId },
      relations: ['event'],
    });

    if (!participation) {
      throw new NotFoundException(`Participation #${participationId} non trouvée`);
    }

    if (participation.event.hostId !== hostId) {
      throw new ForbiddenException('Seul l\'hôte peut gérer les participations');
    }

    participation.status = updateDto.status;
    return this.participationRepository.save(participation);
  }

  async cancelParticipation(eventId: number, userId: number) {
    const participation = await this.participationRepository.findOne({
      where: { eventId, userId },
    });
    if (!participation) {
      throw new NotFoundException('Participation non trouvée');
    }

    await this.participationRepository.remove(participation);
    return { message: 'Participation annulée avec succès' };
  }
}