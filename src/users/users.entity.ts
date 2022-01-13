import { Exclude } from 'class-transformer';
import { CardEntity } from 'src/cards/crads.entity';
import { ColumnEntity } from 'src/columns/columns.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @OneToMany(() => ColumnEntity, (column) => column.user)
  columns: ColumnEntity;

  @OneToMany(() => CardEntity, (card) => card.user)
  cards: CardEntity;
}
