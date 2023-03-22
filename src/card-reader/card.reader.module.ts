import { Module } from '@nestjs/common';
import { CardReaderController } from './card.reader.controller';
import { CardListenerModule } from '../card-listener/card-listener.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CardReaderController],
  imports: [CardListenerModule, JwtModule, ConfigModule, AuthModule],
})
export class CardReaderModule {}
