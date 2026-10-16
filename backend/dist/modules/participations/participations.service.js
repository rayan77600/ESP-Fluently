"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const participation_entity_1 = require("../../entities/participation.entity");
const event_entity_1 = require("../../entities/event.entity");
let ParticipationsService = class ParticipationsService {
    participationRepository;
    eventRepository;
    constructor(participationRepository, eventRepository) {
        this.participationRepository = participationRepository;
        this.eventRepository = eventRepository;
    }
    async joinEvent(eventId, userId) {
        const event = await this.eventRepository.findOne({
            where: { id: eventId },
            relations: ['participations'],
        });
        if (!event)
            throw new common_1.NotFoundException(`Événement #${eventId} non trouvé`);
        if (event.hostId === userId) {
            throw new common_1.ForbiddenException('Vous êtes l\'hôte de cet événement');
        }
        const existing = await this.participationRepository.findOne({
            where: { eventId, userId },
        });
        if (existing) {
            throw new common_1.ConflictException('Vous avez déjà demandé à participer à cet événement');
        }
        const acceptedCount = event.participations.filter((p) => p.status === participation_entity_1.ParticipationStatus.ACCEPTED).length;
        if (acceptedCount >= event.maxParticipants) {
            throw new common_1.ForbiddenException('L\'événement est complet');
        }
        const participation = this.participationRepository.create({
            eventId,
            userId,
            status: participation_entity_1.ParticipationStatus.PENDING,
        });
        return this.participationRepository.save(participation);
    }
    async getEventParticipations(eventId) {
        return this.participationRepository.find({
            where: { eventId },
            relations: ['user'],
        });
    }
    async getMyParticipations(userId) {
        return this.participationRepository.find({
            where: { userId },
            relations: ['event', 'event.host', 'event.eventLanguages', 'event.eventLanguages.language'],
        });
    }
    async updateStatus(participationId, updateDto, hostId) {
        const participation = await this.participationRepository.findOne({
            where: { id: participationId },
            relations: ['event'],
        });
        if (!participation) {
            throw new common_1.NotFoundException(`Participation #${participationId} non trouvée`);
        }
        if (participation.event.hostId !== hostId) {
            throw new common_1.ForbiddenException('Seul l\'hôte peut gérer les participations');
        }
        participation.status = updateDto.status;
        return this.participationRepository.save(participation);
    }
    async cancelParticipation(eventId, userId) {
        const participation = await this.participationRepository.findOne({
            where: { eventId, userId },
        });
        if (!participation) {
            throw new common_1.NotFoundException('Participation non trouvée');
        }
        await this.participationRepository.remove(participation);
        return { message: 'Participation annulée avec succès' };
    }
};
exports.ParticipationsService = ParticipationsService;
exports.ParticipationsService = ParticipationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(participation_entity_1.Participation)),
    __param(1, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ParticipationsService);
//# sourceMappingURL=participations.service.js.map