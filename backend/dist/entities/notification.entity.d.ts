import { User } from './user.entity';
export declare enum NotificationType {
    PARTICIPATION = "participation",
    MESSAGE = "message",
    SYSTEM = "system"
}
export declare class Notification {
    id: number;
    recipientId: number;
    message: string;
    type: NotificationType;
    isRead: boolean;
    createdAt: Date;
    recipient: User;
}
