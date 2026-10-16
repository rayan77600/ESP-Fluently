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
exports.LanguagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const language_entity_1 = require("../../entities/language.entity");
let LanguagesService = class LanguagesService {
    languageRepository;
    constructor(languageRepository) {
        this.languageRepository = languageRepository;
    }
    async findAll() {
        return this.languageRepository.find({ order: { id: 'ASC' } });
    }
    async findOne(id) {
        const language = await this.languageRepository.findOne({ where: { id } });
        if (!language)
            throw new common_1.NotFoundException(`Langue #${id} non trouvée`);
        return language;
    }
    async create(createLanguageDto) {
        const existing = await this.languageRepository.findOne({
            where: { code: createLanguageDto.code },
        });
        if (existing)
            throw new common_1.ConflictException(`La langue avec le code "${createLanguageDto.code}" existe déjà`);
        const language = this.languageRepository.create(createLanguageDto);
        return this.languageRepository.save(language);
    }
    async update(id, updateLanguageDto) {
        const language = await this.languageRepository.findOne({ where: { id } });
        if (!language)
            throw new common_1.NotFoundException(`Langue #${id} non trouvée`);
        Object.assign(language, updateLanguageDto);
        return this.languageRepository.save(language);
    }
    async remove(id) {
        const language = await this.languageRepository.findOne({ where: { id } });
        if (!language)
            throw new common_1.NotFoundException(`Langue #${id} non trouvée`);
        await this.languageRepository.remove(language);
        return { message: `Langue #${id} supprimée avec succès` };
    }
};
exports.LanguagesService = LanguagesService;
exports.LanguagesService = LanguagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(language_entity_1.Language)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LanguagesService);
//# sourceMappingURL=languages.service.js.map