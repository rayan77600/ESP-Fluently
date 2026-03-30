import { User } from './user.entity';
import { Event } from './event.entity';
export declare class Feedback {
    id: number;
    rating: number;
    comment: string;
    event: Event;
    eventId: number;
    user: User;
    userId: number;
    createdAt: Date;
}
