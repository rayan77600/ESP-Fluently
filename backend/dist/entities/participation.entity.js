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
exports.Participation = exports.ParticipationStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const event_entity_1 = require("./event.entity");
var ParticipationStatus;
(function (ParticipationStatus) {
    ParticipationStatus["PENDING"] = "pending";
    ParticipationStatus["ACCEPTED"] = "accepted";
    ParticipationStatus["REFUSED"] = "refused";
})(ParticipationStatus || (exports.ParticipationStatus = ParticipationStatus = {}));
let Participation = class Participation {
    id;
    user;
    userId;
    event;
    eventId;
    status;
    joinedAt;
};
exports.Participation = Participation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Participation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], Participation.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Participation.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.Event, { onDelete: 'CASCADE' }),
    __metadata("design:type", event_entity_1.Event)
], Participation.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Participation.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ParticipationStatus, default: ParticipationStatus.PENDING }),
    __metadata("design:type", String)
], Participation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Participation.prototype, "joinedAt", void 0);
exports.Participation = Participation = __decorate([
    (0, typeorm_1.Entity)('participations')
], Participation);
//# sourceMappingURL=participation.entity.js.map