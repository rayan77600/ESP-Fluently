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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_entity_1 = require("../../entities/event.entity");
const event_language_entity_1 = require("../../entities/event-language.entity");
const user_entity_1 = require("../../entities/user.entity");
let EventsService = class EventsService {
    eventsRepository;
    eventLanguageRepository;
    usersRepository;
    constructor(eventsRepository, eventLanguageRepository, usersRepository) {
        this.eventsRepository = eventsRepository;
        this.eventLanguageRepository = eventLanguageRepository;
        this.usersRepository = usersRepository;
    }
    async create(createEventDto, hostId) {
        const { languageIds, ...eventData } = createEventDto;
        await this.usersRepository.update({ id: hostId, role: user_entity_1.UserRole.USER }, { role: user_entity_1.UserRole.HOST });
        const event = this.eventsRepository.create({ ...eventData, hostId });
        const savedEvent = await this.eventsRepository.save(event);
        if (languageIds && languageIds.length > 0) {
            const eventLanguages = languageIds.map((languageId) => this.eventLanguageRepository.create({ eventId: savedEvent.id, languageId }));
            await this.eventLanguageRepository.save(eventLanguages);
        }
        return this.findOne(savedEvent.id);
    }
    async findAll(city) {
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
    async findOne(id) {
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
        if (!event)
            throw new common_1.NotFoundException(`Événement #${id} non trouvé`);
        return event;
    }
    async update(id, updateEventDto, userId) {
        const event = await this.eventsRepository.findOne({ where: { id } });
        if (!event)
            throw new common_1.NotFoundException(`Événement #${id} non trouvé`);
        if (event.hostId !== userId) {
            throw new common_1.ForbiddenException('Seul l\'hôte peut modifier cet événement');
        }
        const { languageIds, ...eventData } = updateEventDto;
        Object.assign(event, eventData);
        await this.eventsRepository.save(event);
        if (languageIds !== undefined) {
            await this.eventLanguageRepository.delete({ eventId: id });
            if (languageIds.length > 0) {
                const eventLanguages = languageIds.map((languageId) => this.eventLanguageRepository.create({ eventId: id, languageId }));
                await this.eventLanguageRepository.save(eventLanguages);
            }
        }
        return this.findOne(id);
    }
    async remove(id, userId) {
        const event = await this.eventsRepository.findOne({ where: { id } });
        if (!event)
            throw new common_1.NotFoundException(`Événement #${id} non trouvé`);
        if (event.hostId !== userId) {
            throw new common_1.ForbiddenException('Seul l\'hôte peut supprimer cet événement');
        }
        await this.eventsRepository.remove(event);
        return { message: `Événement #${id} supprimé avec succès` };
    }
    async getMyEvents(userId) {
        return this.eventsRepository.find({
            where: { hostId: userId },
            relations: ['eventLanguages', 'eventLanguages.language', 'participations'],
        });
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __param(1, (0, typeorm_1.InjectRepository)(event_language_entity_1.EventLanguage)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EventsService);
//# sourceMappingURL=events.service.js.map