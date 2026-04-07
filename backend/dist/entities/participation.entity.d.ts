import { User } from './user.entity';
import { Event } from './event.entity';
export declare enum ParticipationStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REFUSED = "refused"
}
export declare class Participation {
    id: number;
    userId: number;
    eventId: number;
    status: ParticipationStatus;
    joinedAt: Date;
    user: User;
    event: Event;
}
