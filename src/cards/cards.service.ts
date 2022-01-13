import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { CardEntity } from './crads.entity';

@Injectable()
export class CardsService extends TypeOrmCrudService<CardEntity> {
  constructor(
    @InjectRepository(CardEntity)
    readonly cardRepository: Repository<CardEntity>,
  ) {
    super(cardRepository);
  }
}
