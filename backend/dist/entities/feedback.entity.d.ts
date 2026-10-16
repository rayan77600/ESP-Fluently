import { User } from './user.entity';
import { Event } from './event.entity';
export declare class Feedback {
    id: number;
    rating: number;
    comment: string;
    eventId: number;
    authorId: number;
    createdAt: Date;
    event: Event;
    author: User;
}
