import { User } from './user.entity';
import { Event } from './event.entity';
export declare enum ParticipationStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REFUSED = "refused"
}
export declare class Participation {
    id: number;
    user: User;
    userId: number;
    event: Event;
    eventId: number;
    status: ParticipationStatus;
    joinedAt: Date;
}
