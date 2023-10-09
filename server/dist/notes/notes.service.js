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
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NotesService = exports.NotesService = class NotesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    getNotes() {
        return this.prismaService.note.findMany({ include: { links: true, board: true } });
    }
    getNote(id) {
        return this.prismaService.note.findUnique({ where: { id }, include: { links: true, board: true } });
    }
    async createNote(createNoteDto) {
        return this.prismaService.note.create({
            data: {
                title: createNoteDto.title,
                details: createNoteDto.details,
                links: {
                    createMany: { data: createNoteDto.links }
                },
                boardId: createNoteDto.boardId
            },
            include: { links: true, board: true }
        });
    }
    async updateNote(updateNoteDto) {
        return this.prismaService.note.update({
            where: { id: updateNoteDto.id },
            data: {
                title: updateNoteDto.title,
                details: updateNoteDto.details,
                links: {
                    set: updateNoteDto.links
                },
            },
            include: { links: true, board: true }
        });
    }
    deleteNote(id) {
        return this.prismaService.note.delete({ where: { id } });
    }
    getNoteLinks(noteId) {
        return this.prismaService.noteLink.findMany({ where: { noteId } });
    }
};
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotesService);
//# sourceMappingURL=notes.service.js.map