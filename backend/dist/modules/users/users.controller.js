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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const add_language_dto_1 = require("./dto/add-language.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_entity_1 = require("../../entities/user.entity");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAll() {
        return this.usersService.findAll();
    }
    getMyProfile(req) {
        return this.usersService.findOne(req.user.id);
    }
    updateMyProfile(req, updateProfileDto) {
        return this.usersService.updateProfile(req.user.id, updateProfileDto);
    }
    deleteMyProfile(req) {
        return this.usersService.deleteProfile(req.user.id);
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    addLanguage(req, addLanguageDto) {
        return this.usersService.addLanguage(req.user.id, addLanguageDto);
    }
    removeLanguage(req, languageId) {
        return this.usersService.removeLanguage(req.user.id, languageId);
    }
    getMyLanguages(req) {
        return this.usersService.getUserLanguages(req.user.id);
    }
    getMyEvents(req) {
        return this.usersService.getUserEvents(req.user.id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Liste de tous les utilisateurs (admin uniquement)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des utilisateurs' }),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Mon profil complet avec mes langues' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profil de l\'utilisateur connecté' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Put)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Modifier mon profil' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profil mis à jour' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateMyProfile", null);
__decorate([
    (0, common_1.Delete)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer mon compte' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Compte supprimé avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token manquant ou invalide' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteMyProfile", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Voir le profil d\'un utilisateur par ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profil de l\'utilisateur' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Utilisateur non trouvé' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('languages'),
    (0, swagger_1.ApiOperation)({ summary: 'Ajouter une langue à mon profil (ou mettre à jour le niveau)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Langue ajoutée ou mise à jour' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_language_dto_1.AddLanguageDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addLanguage", null);
__decorate([
    (0, common_1.Delete)('languages/:languageId'),
    (0, swagger_1.ApiOperation)({ summary: 'Retirer une langue de mon profil' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Langue retirée' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('languageId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "removeLanguage", null);
__decorate([
    (0, common_1.Get)('me/languages'),
    (0, swagger_1.ApiOperation)({ summary: 'Voir mes langues' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des langues de l\'utilisateur' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getMyLanguages", null);
__decorate([
    (0, common_1.Get)('me/events'),
    (0, swagger_1.ApiOperation)({ summary: 'Voir les événements que j\'ai créés' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des événements créés' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getMyEvents", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map