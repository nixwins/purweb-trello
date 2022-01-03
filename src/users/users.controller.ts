import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

@Crud({
  model: {
    type: UserEntity,
  },
})
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController implements CrudController<UserEntity> {
  constructor(public service: UsersService) {}
}
