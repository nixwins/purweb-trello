import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { OwnerGuard } from 'src/auth/guards/owner.guard';
import { mixinCheckOwnerchip } from 'src/auth/interceptor/ownership.interceptor';
import { UserDto } from 'src/users/dto/user.dto';
import { UserEntity } from 'src/users/users.entity';
import { CardsService } from './cards.service';
import { CardEntity } from './crads.entity';

@Crud({
  model: {
    type: CardEntity,
  },
  params: {
    columnId: {
      field: 'columnId',
      type: 'number',
    },
  },

  // query: {
  //   join: {
  //     cards: {
  //       eager: true,
  //     },
  //   },
  // },
})
@CrudAuth({
  property: 'user',
  persist: (user: UserEntity) => ({
    user: user,
  }),
  filter: (user: UserDto) => ({ 'CardEntity.userId': user.id }),
})
// @UseInterceptors(mixinCheckOwnerchip(CardEntity, 'user'))
@UseGuards(JwtGuard)
@Controller()
export class CardsController implements CrudController<CardEntity> {
  constructor(public service: CardsService) {}
  get base(): CrudController<CardEntity> {
    return this;
  }
}
