import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokensService } from './token.service';
import { TokenEntity } from './tokens.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET_KEY,
        ignoreExpiresIn: false,
      }),
    }),
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
