import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CardListenerService } from './card-listener.service';
export declare class CardListenerGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private cardListenerService;
    constructor(cardListenerService: CardListenerService);
    private readonly logger;
    server: Server;
    cardListenerJoin(cardListenerId: string, client: Socket): Promise<void>;
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
}
