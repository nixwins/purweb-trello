import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('columns')
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
