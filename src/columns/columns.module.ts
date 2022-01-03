import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsController } from './columns.controller';
import { ColumnEntity } from './columns.entity';
import { ColumnsService } from './columns.service';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity])],
  controllers: [ColumnsController],
  providers: [ColumnsService],
  exports: [ColumnsService],
})
export class ColumnsModule {}
