import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { User } from './user.model';

@Entity('community')
export class Community {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column({ length: 50, nullable: true })
  memo: number;

  @Column({ length: 256, nullable: true })
  image: string;

  @Column()
  timestamp: Timestamp;

  @ManyToOne(() => User, (user) => user.community, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
