import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.model';

@Entity('x')
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

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @ManyToOne(() => User, (user) => user.community, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
