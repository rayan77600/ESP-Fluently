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
exports.ParticipationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const participations_service_1 = require("./participations.service");
const update_participation_dto_1 = require("./dto/update-participation.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let ParticipationsController = class ParticipationsController {
    participationsService;
    constructor(participationsService) {
        this.participationsService = participationsService;
    }
    joinEvent(eventId, req) {
        return this.participationsService.joinEvent(eventId, req.user.id);
    }
    cancelParticipation(eventId, req) {
        return this.participationsService.cancelParticipation(eventId, req.user.id);
    }
    getEventParticipations(eventId) {
        return this.participationsService.getEventParticipations(eventId);
    }
    getMyParticipations(req) {
        return this.participationsService.getMyParticipations(req.user.id);
    }
    updateStatus(id, updateDto, req) {
        return this.participationsService.updateStatus(id, updateDto, req.user.id);
    }
};
exports.ParticipationsController = ParticipationsController;
__decorate([
    (0, common_1.Post)('events/:eventId/join'),
    (0, swagger_1.ApiOperation)({ summary: 'Demander à participer à un événement' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Demande de participation envoyée' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Déjà inscrit à cet événement' }),
    __param(0, (0, common_1.Param)('eventId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ParticipationsController.prototype, "joinEvent", null);
__decorate([
    (0, common_1.Delete)('events/:eventId/leave'),
    (0, swagger_1.ApiOperation)({ summary: 'Annuler ma participation à un événement' }),
    __param(0, (0, common_1.Param)('eventId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ParticipationsController.prototype, "cancelParticipation", null);
__decorate([
    (0, common_1.Get)('events/:eventId'),
    (0, swagger_1.ApiOperation)({ summary: 'Liste des participants d\'un événement (hôte)' }),
    __param(0, (0, common_1.Param)('eventId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ParticipationsController.prototype, "getEventParticipations", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Mes participations (tous mes événements rejoints)' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ParticipationsController.prototype, "getMyParticipations", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Accepter ou refuser une participation (hôte)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Statut mis à jour' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_participation_dto_1.UpdateParticipationDto, Object]),
    __metadata("design:returntype", void 0)
], ParticipationsController.prototype, "updateStatus", null);
exports.ParticipationsController = ParticipationsController = __decorate([
    (0, swagger_1.ApiTags)('Participations'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('participations'),
    __metadata("design:paramtypes", [participations_service_1.ParticipationsService])
], ParticipationsController);
//# sourceMappingURL=participations.controller.js.map