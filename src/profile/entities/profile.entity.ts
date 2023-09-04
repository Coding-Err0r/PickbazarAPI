import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  avatar?: string;

  @Column()
  bio?: string;

  @Column()
  phone_number?: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  // For relationship between other tables
  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' }) // specify inverse side as a second parameter
  user: User;
  //   socials?: Social[];
}
