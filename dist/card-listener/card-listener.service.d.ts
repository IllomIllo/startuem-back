import { Server } from 'socket.io';
export declare class CardListenerService {
    private _server;
    set server(serverInstance: Server);
    get server(): Server;
    emitNewUserUID(userUID: string, readerId: string): void;
}
