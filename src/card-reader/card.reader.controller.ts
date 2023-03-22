import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CardReaderPostUIDDto } from './card.reader.dto';
import { Response } from 'express';
import { CardListenerService } from '../card-listener/card-listener.service';
import { Roles } from '../roles/decorators/roles-auth.decorator';
import { RoleVariant } from '../roles/roles.types';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { LocalRolesGuard } from '../roles/guards/local-roles.guard';

@Controller('cardReader')
export class CardReaderController {
  constructor(private readonly cardListenerService: CardListenerService) {}

  @UseGuards(LocalAuthGuard)
  @Roles(RoleVariant.SuperAdmin)
  @UseGuards(LocalRolesGuard)
  @Post('/postUID')
  postUID(@Body() body: CardReaderPostUIDDto, @Res() response: Response) {
    this.cardListenerService.emitNewUserUID(body?.userUID, body?.readerUID);
    console.log(body);
    response.status(HttpStatus.OK).end();
  }
}
