import { User } from './user.entity';
import { Event } from './event.entity';
export declare class Photo {
    id: number;
    url: string;
    eventId: number;
    uploadedById: number;
    uploadedAt: Date;
    event: Event;
    uploadedBy: User;
}
