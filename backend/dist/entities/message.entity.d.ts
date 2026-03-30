import { User } from './user.entity';
import { Event } from './event.entity';
export declare class Message {
    id: number;
    content: string;
    event: Event;
    eventId: number;
    sender: User;
    senderId: number;
    sentAt: Date;
}
