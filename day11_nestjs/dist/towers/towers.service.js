"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TowersService = void 0;
const common_1 = require("@nestjs/common");
let TowersService = class TowersService {
    towers = [
        { id: 't1', projectId: '1', name: 'Tower A', floors: 20, status: 'Under Construction' },
        { id: 't2', projectId: '1', name: 'Tower B', floors: 18, status: 'Planned' },
        { id: 't3', projectId: '3', name: 'Main Station', floors: 3, status: 'Completed' },
    ];
    findByProject(projectId) {
        return this.towers.filter((t) => t.projectId === projectId);
    }
    create(projectId, dto) {
        const tower = {
            id: String(Date.now()),
            projectId,
            ...dto,
        };
        this.towers.push(tower);
        return tower;
    }
};
exports.TowersService = TowersService;
exports.TowersService = TowersService = __decorate([
    (0, common_1.Injectable)()
], TowersService);
//# sourceMappingURL=towers.service.js.map