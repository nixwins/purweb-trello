import { CardEntity } from 'src/cards/crads.entity';
import { UserEntity } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('columns')
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.columns)
  user: UserEntity;

  @OneToMany(() => CardEntity, (card) => card.column)
  cards: CardEntity[];
}
