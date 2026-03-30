import { User } from './user.entity';
export declare enum NotificationType {
    PARTICIPATION = "participation",
    MESSAGE = "message",
    SYSTEM = "system"
}
export declare class Notification {
    id: number;
    user: User;
    userId: number;
    message: string;
    type: NotificationType;
    isRead: boolean;
    createdAt: Date;
}
