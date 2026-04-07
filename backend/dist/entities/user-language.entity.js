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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLanguage = exports.LanguageLevel = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./user.entity");
const language_entity_1 = require("./language.entity");
var LanguageLevel;
(function (LanguageLevel) {
    LanguageLevel["BEGINNER"] = "beginner";
    LanguageLevel["INTERMEDIATE"] = "intermediate";
    LanguageLevel["ADVANCED"] = "advanced";
    LanguageLevel["NATIVE"] = "native";
})(LanguageLevel || (exports.LanguageLevel = LanguageLevel = {}));
let UserLanguage = class UserLanguage {
    id;
    userId;
    languageId;
    level;
    user;
    language;
};
exports.UserLanguage = UserLanguage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserLanguage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], UserLanguage.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'language_id' }),
    __metadata("design:type", Number)
], UserLanguage.prototype, "languageId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: LanguageLevel,
        default: LanguageLevel.BEGINNER,
    }),
    (0, swagger_1.ApiProperty)({ enum: LanguageLevel }),
    __metadata("design:type", String)
], UserLanguage.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.userLanguages),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserLanguage.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => language_entity_1.Language, (language) => language.userLanguages),
    (0, typeorm_1.JoinColumn)({ name: 'language_id' }),
    __metadata("design:type", language_entity_1.Language)
], UserLanguage.prototype, "language", void 0);
exports.UserLanguage = UserLanguage = __decorate([
    (0, typeorm_1.Entity)('user_languages')
], UserLanguage);
//# sourceMappingURL=user-language.entity.js.map