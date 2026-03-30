import { User } from './user.entity';
export declare class Event {
    id: number;
    title: string;
    description: string;
    city: string;
    address: string;
    eventDate: Date;
    maxParticipants: number;
    host: User;
    hostId: number;
    createdAt: Date;
    updatedAt: Date;
}
