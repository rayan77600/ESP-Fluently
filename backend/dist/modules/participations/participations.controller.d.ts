import { ParticipationsService } from './participations.service';
import { UpdateParticipationDto } from './dto/update-participation.dto';
export declare class ParticipationsController {
    private readonly participationsService;
    constructor(participationsService: ParticipationsService);
    joinEvent(eventId: number, req: any): Promise<import("../../entities/participation.entity").Participation>;
    cancelParticipation(eventId: number, req: any): Promise<{
        message: string;
    }>;
    getEventParticipations(eventId: number): Promise<import("../../entities/participation.entity").Participation[]>;
    getMyParticipations(req: any): Promise<import("../../entities/participation.entity").Participation[]>;
    updateStatus(id: number, updateDto: UpdateParticipationDto, req: any): Promise<import("../../entities/participation.entity").Participation>;
}
