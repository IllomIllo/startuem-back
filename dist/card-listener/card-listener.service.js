"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardListenerService = void 0;
const common_1 = require("@nestjs/common");
let CardListenerService = class CardListenerService {
    constructor() {
        this._server = null;
    }
    set server(serverInstance) {
        this._server = serverInstance;
    }
    get server() {
        if (!this._server) {
            throw new common_1.InternalServerErrorException('Ошибка при подключении к сокет-серверу');
        }
        return this._server;
    }
    emitNewUserUID(userUID, readerId) {
        this.server.to(readerId).emit('CARD_LISTENER:NEW_USER_ID', userUID);
    }
};
CardListenerService = __decorate([
    (0, common_1.Injectable)()
], CardListenerService);
exports.CardListenerService = CardListenerService;
//# sourceMappingURL=card-listener.service.js.map