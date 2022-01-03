import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { hash, compare } from 'bcryptjs';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { TokensService } from 'src/tokens/token.service';
import { EMAIL_IS_BUSY, EMAIL_OR_PASSWORD_WRONG } from './constants';

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

  async login({ email, password }: CreateUserDto) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new InternalServerErrorException();
    }
    try {
      const tokens = await this.tokenService.generateTokens(user);

      await this.tokenService.saveRefreshToken(tokens.refreshToken, user.id);
      return {
        ...tokens,
        user,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  private async validateUser(email: string, password: string) {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new UnauthorizedException(EMAIL_OR_PASSWORD_WRONG);
    }
    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(EMAIL_OR_PASSWORD_WRONG);
    }

    return {
      id: user.id,
      email: user.email,
    };
  }
}
