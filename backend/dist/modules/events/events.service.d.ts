import { Repository } from 'typeorm';
import { Event } from '../../entities/event.entity';
import { EventLanguage } from '../../entities/event-language.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from '../../entities/user.entity';
export declare class EventsService {
    private eventsRepository;
    private eventLanguageRepository;
    private usersRepository;
    constructor(eventsRepository: Repository<Event>, eventLanguageRepository: Repository<EventLanguage>, usersRepository: Repository<User>);
    create(createEventDto: CreateEventDto, hostId: number): Promise<Event>;
    findAll(city?: string): Promise<Event[]>;
    findOne(id: number): Promise<Event>;
    update(id: number, updateEventDto: UpdateEventDto, userId: number): Promise<Event>;
    remove(id: number, userId: number): Promise<{
        message: string;
    }>;
    getMyEvents(userId: number): Promise<Event[]>;
}
