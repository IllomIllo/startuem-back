"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardListenerModule = void 0;
const common_1 = require("@nestjs/common");
const card_listener_gateway_1 = require("./card-listener.gateway");
const card_listener_service_1 = require("./card-listener.service");
let CardListenerModule = class CardListenerModule {
};
CardListenerModule = __decorate([
    (0, common_1.Module)({
        providers: [card_listener_gateway_1.CardListenerGateway, card_listener_service_1.CardListenerService],
        exports: [card_listener_service_1.CardListenerService],
    })
], CardListenerModule);
exports.CardListenerModule = CardListenerModule;
//# sourceMappingURL=card-listener.module.js.map