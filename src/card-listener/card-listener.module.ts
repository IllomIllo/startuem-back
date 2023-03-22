import { Module } from '@nestjs/common';
import { CardListenerGateway } from './card-listener.gateway';
import { CardListenerService } from './card-listener.service';

@Module({
  providers: [CardListenerGateway, CardListenerService],
  exports: [CardListenerService],
})
export class CardListenerModule {}
