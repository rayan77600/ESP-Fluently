import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../entities/event.entity';
import { EventLanguage } from '../../entities/event-language.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User, UserRole } from '../../entities/user.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,

    @InjectRepository(EventLanguage)
    private eventLanguageRepository: Repository<EventLanguage>,

    @InjectRepository(User)                          // ← ajoute ça
    private usersRepository: Repository<User>,
  ) {}

  async create(createEventDto: CreateEventDto, hostId: number) {
    const { languageIds, ...eventData } = createEventDto;

    // Promouvoir en HOST si encore USER
    await this.usersRepository.update(
      { id: hostId, role: UserRole.USER },
      { role: UserRole.HOST },
    );

    const event = this.eventsRepository.create({ ...eventData, hostId });
    const savedEvent = await this.eventsRepository.save(event);

    if (languageIds && languageIds.length > 0) {
      const eventLanguages = languageIds.map((languageId) =>
        this.eventLanguageRepository.create({ eventId: savedEvent.id, languageId }),
      );
      await this.eventLanguageRepository.save(eventLanguages);
    }

    return this.findOne(savedEvent.id);
  }

  async findAll(city?: string) {
    const query = this.eventsRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.host', 'host')
      .leftJoinAndSelect('event.eventLanguages', 'eventLanguages')
      .leftJoinAndSelect('eventLanguages.language', 'language')
      .leftJoinAndSelect('event.participations', 'participations')
      .select([
        'event',
        'host.id', 'host.firstName', 'host.lastName', 'host.profilePicture',
        'eventLanguages',
        'language',
        'participations.id', 'participations.status',
      ]);

    if (city) {
      query.where('LOWER(event.city) LIKE LOWER(:city)', { city: `%${city}%` });
    }

    return query.orderBy('event.eventDate', 'ASC').getMany();
  }

  async findOne(id: number) {
    const event = await this.eventsRepository.findOne({
      where: { id },
      relations: [
        'host',
        'eventLanguages',
        'eventLanguages.language',
        'participations',
        'participations.user',
      ],
    });

    if (!event) throw new NotFoundException(`Événement #${id} non trouvé`);
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto, userId: number) {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) throw new NotFoundException(`Événement #${id} non trouvé`);

    if (event.hostId !== userId) {
      throw new ForbiddenException('Seul l\'hôte peut modifier cet événement');
    }

    const { languageIds, ...eventData } = updateEventDto;

    Object.assign(event, eventData);
    await this.eventsRepository.save(event);

    if (languageIds !== undefined) {
      // Supprime les anciennes langues et remet les nouvelles
      await this.eventLanguageRepository.delete({ eventId: id });
      if (languageIds.length > 0) {
        const eventLanguages = languageIds.map((languageId) =>
          this.eventLanguageRepository.create({ eventId: id, languageId }),
        );
        await this.eventLanguageRepository.save(eventLanguages);
      }
    }

    return this.findOne(id);
  }

  async remove(id: number, userId: number) {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) throw new NotFoundException(`Événement #${id} non trouvé`);

    if (event.hostId !== userId) {
      throw new ForbiddenException('Seul l\'hôte peut supprimer cet événement');
    }

    await this.eventsRepository.remove(event);
    return { message: `Événement #${id} supprimé avec succès` };
  }

  async getMyEvents(userId: number) {
    return this.eventsRepository.find({
      where: { hostId: userId },
      relations: ['eventLanguages', 'eventLanguages.language', 'participations'],
    });
  }
}