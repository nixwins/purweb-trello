import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService extends TypeOrmCrudService<UserEntity> {
  constructor(@InjectRepository(UserEntity) readonly userRepository) {
    super(userRepository);
  }

  async createUser(user: CreateUserDto) {
    const candidate = await this.userRepository.save(user);
    return candidate;
  }
}
