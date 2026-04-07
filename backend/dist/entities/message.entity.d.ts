import { User } from './user.entity';
import { Event } from './event.entity';
export declare class Message {
    id: number;
    content: string;
    eventId: number;
    authorId: number;
    sentAt: Date;
    event: Event;
    author: User;
}
