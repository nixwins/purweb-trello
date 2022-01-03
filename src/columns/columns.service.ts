import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from './columns.entity';

@Injectable()
export class ColumnsService extends TypeOrmCrudService<ColumnEntity> {
  constructor(
    @InjectRepository(ColumnEntity)
    readonly columnRepository: Repository<ColumnEntity>,
  ) {
    super(columnRepository);
  }
}
