import { IsEmail, IsNumber, MinLength } from 'class-validator';

export class UserDto {
  @IsNumber()
  id: number;

  @IsEmail({}, { message: 'Некоректный email' })
  readonly email: string;
}
