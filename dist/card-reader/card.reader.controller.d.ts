import { CardReaderPostUIDDto } from './card.reader.dto';
import { Response } from 'express';
import { CardListenerService } from '../card-listener/card-listener.service';
export declare class CardReaderController {
    private readonly cardListenerService;
    constructor(cardListenerService: CardListenerService);
    postUID(body: CardReaderPostUIDDto, response: Response): void;
}
