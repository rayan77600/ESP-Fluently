export declare enum UserRole {
    USER = "user",
    HOST = "host",
    ADMIN = "admin"
}
export declare class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    bio: string;
    city: string;
    birthDate: Date;
    profilePicture: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
