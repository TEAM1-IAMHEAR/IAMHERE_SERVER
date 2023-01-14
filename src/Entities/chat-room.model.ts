import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.model';
import { User } from './user.model';

@Entity('chatRoom')
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => User, (user) => user.chatRoom)
  user: User[];

  @OneToMany(() => Message, (message) => message.chatRoom)
  message: Message[];
}
