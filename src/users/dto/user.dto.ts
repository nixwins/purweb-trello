import { IsEmail, IsNumber, MinLength } from 'class-validator';

export class UserDto {
  @IsNumber()
  id: number;

  @IsEmail({}, { message: 'Некоректный email' })
  readonly email: string;

  @MinLength(6, { message: 'Пароль не может быть меньше 6' })
  readonly password: string;
}
