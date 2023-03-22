import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CardListenerService } from './card-listener.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CardListenerGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private cardListenerService: CardListenerService) {}

  private readonly logger = new Logger(CardListenerGateway.name);

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('CARD_LISTENER:JOIN')
  async cardListenerJoin(
    @MessageBody() cardListenerId: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log(
      `Клиент ${client.id} подсоединился к считывателю ${cardListenerId}`,
    );
    return client.join(cardListenerId);
  }

  afterInit(server: Server) {
    this.cardListenerService.server = server;
  }

  handleConnection(client: Socket) {
    this.logger.log(`Клиент подсоединился к сокет-серверу ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Клиент отключился от сокет-сервера ${client.id}`);
  }
}
