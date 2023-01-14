import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Community } from './community.model';
import { ChatRoom } from './chat-room.model';
import { Message } from './message.model';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15 })
  nickname: string;

  @Column({ length: 256 })
  password: string;

  @Column()
  age: number;

  @Column({ length: 4 })
  mbti: string;

  @Column({ length: 256, nullable: true })
  profile: string;

  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken?: string;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'chatRoomId' })
  chatRoom: ChatRoom;

  @OneToMany(() => Community, (community) => community.user)
  community: Community[];

  @OneToMany(() => Message, (message) => message.user)
  message: Message[];
}
