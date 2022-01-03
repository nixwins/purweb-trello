import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) readonly userRepository) {
    super(userRepository);
  }

  async createUser(user: CreateUserDto) {
    const candidate = await this.userRepository.save(user);
    return candidate;
  }
}
