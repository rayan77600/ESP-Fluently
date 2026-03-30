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
exports.Photo = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const event_entity_1 = require("./event.entity");
let Photo = class Photo {
    id;
    url;
    event;
    eventId;
    user;
    userId;
    uploadedAt;
};
exports.Photo = Photo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Photo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Photo.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.Event, { onDelete: 'CASCADE' }),
    __metadata("design:type", event_entity_1.Event)
], Photo.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Photo.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], Photo.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Photo.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Photo.prototype, "uploadedAt", void 0);
exports.Photo = Photo = __decorate([
    (0, typeorm_1.Entity)('photos')
], Photo);
//# sourceMappingURL=photo.entity.js.map