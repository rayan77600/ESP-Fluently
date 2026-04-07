import { Repository } from 'typeorm';
import { Participation } from '../../entities/participation.entity';
import { Event } from '../../entities/event.entity';
import { UpdateParticipationDto } from './dto/update-participation.dto';
export declare class ParticipationsService {
    private participationRepository;
    private eventRepository;
    constructor(participationRepository: Repository<Participation>, eventRepository: Repository<Event>);
    joinEvent(eventId: number, userId: number): Promise<Participation>;
    getEventParticipations(eventId: number): Promise<Participation[]>;
    getMyParticipations(userId: number): Promise<Participation[]>;
    updateStatus(participationId: number, updateDto: UpdateParticipationDto, hostId: number): Promise<Participation>;
    cancelParticipation(eventId: number, userId: number): Promise<{
        message: string;
    }>;
}
