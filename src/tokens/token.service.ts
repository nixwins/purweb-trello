import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/users/dto/user.dto';
import { Repository } from 'typeorm';
import { TokenDto } from './dto/token.dto';
import { TokenEntity } from './tokens.entity';

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  async generateTokens(payload: UserDto): Promise<TokenDto> {
    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.sign(payload, {
      secret: process.env.SECRET_KEY_REFRESH,
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }
  async saveRefreshToken(token: string, userId: number): Promise<TokenEntity> {
    const candidateToken = await this.tokenRepository.findOne({ userId });
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 7);
    try {
      if (candidateToken) {
        candidateToken.refreshToken = token;
        candidateToken.expires = expiresDate;
        return await this.tokenRepository.save(candidateToken);
      }

      const tokenModel = await this.tokenRepository.save({
        userId,
        refreshToken: token,
        expires: expiresDate,
      });
      return tokenModel;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
