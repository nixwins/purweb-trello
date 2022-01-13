import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { mixinCheckOwnerchip } from 'src/auth/interceptor/ownership.interceptor';
import { UserDto } from 'src/users/dto/user.dto';
import { UserEntity } from 'src/users/users.entity';
import { ColumnEntity } from './columns.entity';
import { ColumnsService } from './columns.service';

@Crud({
  model: {
    type: ColumnEntity,
  },
  query: {
    join: {
      cards: {
        eager: true,
      },
    },
  },
})
@CrudAuth({
  property: 'user',
  persist: (user: UserEntity) => ({
    user: user,
  }),
  filter: (user: UserDto) => ({ 'ColumnEntity.userId': user.id }),
})
@UseInterceptors(mixinCheckOwnerchip(ColumnEntity, 'user'))
@UseGuards(JwtGuard)
@Controller()
export class ColumnsController implements CrudController<ColumnEntity> {
  constructor(public service: ColumnsService) {}
}
