"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../entities/user.entity");
const user_language_entity_1 = require("../../entities/user-language.entity");
const language_entity_1 = require("../../entities/language.entity");
let UsersService = class UsersService {
    usersRepository;
    userLanguageRepository;
    languageRepository;
    constructor(usersRepository, userLanguageRepository, languageRepository) {
        this.usersRepository = usersRepository;
        this.userLanguageRepository = userLanguageRepository;
        this.languageRepository = languageRepository;
    }
    async findAll() {
        return this.usersRepository.find({
            select: ['id', 'firstName', 'lastName', 'email', 'city', 'role', 'profilePicture', 'bio'],
        });
    }
    async findOne(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['userLanguages', 'userLanguages.language'],
            select: ['id', 'firstName', 'lastName', 'email', 'bio', 'city', 'role', 'profilePicture', 'createdAt'],
        });
        if (!user)
            throw new common_1.NotFoundException(`Utilisateur #${id} non trouvé`);
        return user;
    }
    async updateProfile(id, updateProfileDto) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException(`Utilisateur #${id} non trouvé`);
        Object.assign(user, updateProfileDto);
        const saved = await this.usersRepository.save(user);
        const { password, ...result } = saved;
        return result;
    }
    async deleteProfile(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException(`Utilisateur #${id} non trouvé`);
        await this.usersRepository.remove(user);
        return { message: 'Compte supprimé avec succès' };
    }
    async addLanguage(userId, addLanguageDto) {
        const { languageId, level } = addLanguageDto;
        const language = await this.languageRepository.findOne({
            where: { id: languageId },
        });
        if (!language)
            throw new common_1.NotFoundException(`Langue #${languageId} non trouvée`);
        const existing = await this.userLanguageRepository.findOne({
            where: { userId, languageId },
        });
        if (existing) {
            existing.level = level;
            return this.userLanguageRepository.save(existing);
        }
        const userLanguage = this.userLanguageRepository.create({
            userId,
            languageId,
            level,
        });
        return this.userLanguageRepository.save(userLanguage);
    }
    async removeLanguage(userId, languageId) {
        const userLanguage = await this.userLanguageRepository.findOne({
            where: { userId, languageId },
        });
        if (!userLanguage) {
            throw new common_1.NotFoundException('Cette langue n\'est pas associée à cet utilisateur');
        }
        return this.userLanguageRepository.remove(userLanguage);
    }
    async getUserLanguages(userId) {
        return this.userLanguageRepository.find({
            where: { userId },
            relations: ['language'],
        });
    }
    async getUserEvents(userId) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
            relations: ['events'],
        });
        if (!user)
            throw new common_1.NotFoundException(`Utilisateur #${userId} non trouvé`);
        return user.events;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_language_entity_1.UserLanguage)),
    __param(2, (0, typeorm_1.InjectRepository)(language_entity_1.Language)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map