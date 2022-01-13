import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardEntity } from './crads.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity])],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
