import { User } from './user.entity';
import { Event } from './event.entity';
export declare class Photo {
    id: number;
    url: string;
    event: Event;
    eventId: number;
    user: User;
    userId: number;
    uploadedAt: Date;
}
