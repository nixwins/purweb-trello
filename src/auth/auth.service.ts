import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { EMAIL_IS_BUSY } from './constants';
import { hash } from 'bcryptjs';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { TokensService } from 'src/tokens/token.service';

@Injectable()
export class AuthSerivce {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokensService,
  ) {}

  async register({ email, password }: CreateUserDto) {
    const candidate = await this.userService.findOne({ email });
    if (candidate) {
      throw new BadRequestException(EMAIL_IS_BUSY);
    }

    try {
      const hashedPassword = await hash(password, 10);
      const createdUser = await this.userService.createUser({
        email,
        password: hashedPassword,
      });

      if (createdUser) {
        const tokens = await this.tokenService.generateTokens(createdUser);
        await this.tokenService.saveRefreshToken(
          tokens.refreshToken,
          createdUser.id,
        );
        createdUser.password = undefined;
        return {
          ...tokens,
          user: createdUser,
        };
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async login(user: CreateUserDto) {
    return user;
  }
}
