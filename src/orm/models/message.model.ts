import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { ChatRoom } from './chat-room.model';
import { User } from './user.model';

@Entity('message')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  message: string;

  @Column({ length: 10 })
  type: string;

  @Column()
  timestamp: Timestamp;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.message, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'chatRoomId' })
  chatRoom: ChatRoom;

  @ManyToOne(() => User, (user) => user.message, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
