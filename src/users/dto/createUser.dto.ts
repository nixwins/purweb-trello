import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Некоректный email' })
  readonly email: string;

  @MinLength(6, { message: 'Пароль не может быть меньше 6' })
  readonly password: string;
}
