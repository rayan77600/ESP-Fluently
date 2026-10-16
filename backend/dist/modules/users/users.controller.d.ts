import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AddLanguageDto } from './dto/add-language.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("../../entities/user.entity").User[]>;
    getMyProfile(req: any): Promise<import("../../entities/user.entity").User>;
    updateMyProfile(req: any, updateProfileDto: UpdateProfileDto): Promise<any>;
    deleteMyProfile(req: any): Promise<{
        message: string;
    }>;
    findOne(id: number): Promise<import("../../entities/user.entity").User>;
    addLanguage(req: any, addLanguageDto: AddLanguageDto): Promise<import("../../entities/user-language.entity").UserLanguage>;
    removeLanguage(req: any, languageId: number): Promise<import("../../entities/user-language.entity").UserLanguage>;
    getMyLanguages(req: any): Promise<import("../../entities/user-language.entity").UserLanguage[]>;
    getMyEvents(req: any): Promise<import("../../entities/event.entity").Event[]>;
}
