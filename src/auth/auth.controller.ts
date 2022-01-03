import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthSerivce } from './auth.service';
import { CreateUserDto } from '../users/dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthSerivce) {}

  @Post('registration')
  async registration(@Body() user: CreateUserDto) {
    return await this.authService.register(user);
  }

  @Post('login')
  async login(@Body() user: CreateUserDto) {
    const userData = await this.authService.login(user);
    return userData;
  }
}
