import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Crud({
  model: {
    type: User,
  },
})
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
