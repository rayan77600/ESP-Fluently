import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { UserLanguage } from '../../entities/user-language.entity';
import { Language } from '../../entities/language.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AddLanguageDto } from './dto/add-language.dto';
export declare class UsersService {
    private usersRepository;
    private userLanguageRepository;
    private languageRepository;
    constructor(usersRepository: Repository<User>, userLanguageRepository: Repository<UserLanguage>, languageRepository: Repository<Language>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    updateProfile(id: number, updateProfileDto: UpdateProfileDto): Promise<any>;
    deleteProfile(id: number): Promise<{
        message: string;
    }>;
    addLanguage(userId: number, addLanguageDto: AddLanguageDto): Promise<UserLanguage>;
    removeLanguage(userId: number, languageId: number): Promise<UserLanguage>;
    getUserLanguages(userId: number): Promise<UserLanguage[]>;
    getUserEvents(userId: number): Promise<import("../../entities/event.entity").Event[]>;
}
