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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const card_reader_module_1 = require("./card-reader/card.reader.module");
const roles_module_1 = require("./roles/roles.module");
const auth_module_1 = require("./auth/auth.module");
const courses_module_1 = require("./courses/courses.module");
const groups_module_1 = require("./groups/groups.module");
const lessons_module_1 = require("./lessons/lessons.module");
const users_module_1 = require("./users/users.module");
const subjects_module_1 = require("./subjects/subjects.module");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.env`,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'HTMLcardreaderETOBASA1041333!!',
                database: 'startuem',
                autoLoadEntities: true,
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            card_reader_module_1.CardReaderModule,
            roles_module_1.RolesModule,
            courses_module_1.CoursesModule,
            groups_module_1.GroupsModule,
            lessons_module_1.LessonsModule,
            users_module_1.UsersModule,
            subjects_module_1.SubjectsModule,
        ],
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map