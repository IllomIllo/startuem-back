import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class CardListenerService {
  private _server: Server | null = null;

  set server(serverInstance: Server) {
    this._server = serverInstance;
  }

  get server(): Server {
    if (!this._server) {
      throw new InternalServerErrorException(
        'Ошибка при подключении к сокет-серверу',
      );
    }
    return this._server;
  }

  emitNewUserUID(userUID: string, readerId: string): void {
    this.server.to(readerId).emit('CARD_LISTENER:NEW_USER_ID', userUID);
  }
}
