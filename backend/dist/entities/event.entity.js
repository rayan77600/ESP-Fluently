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
exports.Event = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./user.entity");
const participation_entity_1 = require("./participation.entity");
const event_language_entity_1 = require("./event-language.entity");
const photo_entity_1 = require("./photo.entity");
const message_entity_1 = require("./message.entity");
const feedback_entity_1 = require("./feedback.entity");
let Event = class Event {
    id;
    title;
    description;
    city;
    address;
    eventDate;
    maxParticipants;
    hostId;
    createdAt;
    updatedAt;
    host;
    participations;
    eventLanguages;
    photos;
    messages;
    feedbacks;
};
exports.Event = Event;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Event.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Event.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Event.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], Event.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'event_date', type: 'timestamp' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Event.prototype, "eventDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_participants', default: 10 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Event.prototype, "maxParticipants", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'host_id' }),
    __metadata("design:type", Number)
], Event.prototype, "hostId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Event.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Event.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.events),
    (0, typeorm_1.JoinColumn)({ name: 'host_id' }),
    __metadata("design:type", user_entity_1.User)
], Event.prototype, "host", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => participation_entity_1.Participation, (participation) => participation.event),
    __metadata("design:type", Array)
], Event.prototype, "participations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_language_entity_1.EventLanguage, (el) => el.event),
    __metadata("design:type", Array)
], Event.prototype, "eventLanguages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => photo_entity_1.Photo, (photo) => photo.event),
    __metadata("design:type", Array)
], Event.prototype, "photos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (message) => message.event),
    __metadata("design:type", Array)
], Event.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feedback_entity_1.Feedback, (feedback) => feedback.event),
    __metadata("design:type", Array)
], Event.prototype, "feedbacks", void 0);
exports.Event = Event = __decorate([
    (0, typeorm_1.Entity)('events')
], Event);
//# sourceMappingURL=event.entity.js.map