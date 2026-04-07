import { User } from './user.entity';
import { Language } from './language.entity';
export declare enum LanguageLevel {
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced",
    NATIVE = "native"
}
export declare class UserLanguage {
    id: number;
    userId: number;
    languageId: number;
    level: LanguageLevel;
    user: User;
    language: Language;
}
