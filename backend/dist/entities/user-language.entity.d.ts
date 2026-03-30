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
    user: User;
    userId: number;
    language: Language;
    languageId: number;
    level: LanguageLevel;
}
