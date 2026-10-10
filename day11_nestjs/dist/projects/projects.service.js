"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
let ProjectsService = class ProjectsService {
    projects = [
        { id: '1', name: 'Skyline Tower', status: 'Active', progress: 65, risk: 'Low', updatedAt: '2026-10-07' },
        { id: '2', name: 'Riverside Bridge', status: 'Pending', progress: 15, risk: 'Medium', updatedAt: '2026-10-05' },
        { id: '3', name: 'Metro Station Phase 2', status: 'Completed', progress: 100, risk: 'Low', updatedAt: '2026-09-28' },
        { id: '4', name: 'Harbor Warehouse', status: 'On Hold', progress: 40, risk: 'High', updatedAt: '2026-10-01' },
    ];
    findAll() {
        return this.projects;
    }
    findOne(id) {
        const project = this.projects.find((p) => p.id === id);
        if (!project)
            throw new common_1.NotFoundException(`Project ${id} not found`);
        return project;
    }
    create(dto) {
        const project = {
            id: String(Date.now()),
            ...dto,
            updatedAt: new Date().toISOString().slice(0, 10),
        };
        this.projects.push(project);
        return project;
    }
    update(id, dto) {
        const project = this.findOne(id);
        Object.assign(project, dto, { updatedAt: new Date().toISOString().slice(0, 10) });
        return project;
    }
    remove(id) {
        const idx = this.projects.findIndex((p) => p.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException(`Project ${id} not found`);
        this.projects.splice(idx, 1);
        return { deleted: true, id };
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)()
], ProjectsService);
//# sourceMappingURL=projects.service.js.map