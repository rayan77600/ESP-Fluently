import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    findAll(city?: string): Promise<import("../../entities/event.entity").Event[]>;
    getMyEvents(req: any): Promise<import("../../entities/event.entity").Event[]>;
    findOne(id: number): Promise<import("../../entities/event.entity").Event>;
    create(createEventDto: CreateEventDto, req: any): Promise<import("../../entities/event.entity").Event>;
    update(id: number, updateEventDto: UpdateEventDto, req: any): Promise<import("../../entities/event.entity").Event>;
    remove(id: number, req: any): Promise<{
        message: string;
    }>;
}
