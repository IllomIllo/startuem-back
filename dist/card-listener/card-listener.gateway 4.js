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
var CardListenerGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardListenerGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const card_listener_service_1 = require("./card-listener.service");
const common_1 = require("@nestjs/common");
let CardListenerGateway = CardListenerGateway_1 = class CardListenerGateway {
    constructor(cardListenerService) {
        this.cardListenerService = cardListenerService;
        this.logger = new common_1.Logger(CardListenerGateway_1.name);
    }
    async cardListenerJoin(cardListenerId, client) {
        this.logger.log(`Клиент ${client.id} подсоединился к считывателю ${cardListenerId}`);
        return client.join(cardListenerId);
    }
    afterInit(server) {
        this.cardListenerService.server = server;
    }
    handleConnection(client) {
        this.logger.log(`Клиент подсоединился к сокет-серверу ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Клиент отключился от сокет-сервера ${client.id}`);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], CardListenerGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('CARD_LISTENER:JOIN'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], CardListenerGateway.prototype, "cardListenerJoin", null);
CardListenerGateway = CardListenerGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [card_listener_service_1.CardListenerService])
], CardListenerGateway);
exports.CardListenerGateway = CardListenerGateway;
//# sourceMappingURL=card-listener.gateway.js.map