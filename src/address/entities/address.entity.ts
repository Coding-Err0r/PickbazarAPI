import { Profile } from 'src/profile/entities/profile.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  title?: string;

  @Column()
  type?: string;

  @Column()
  default?: number;

  @Column()
  zip?: string;

  @Column()
  city?: string;

  @Column()
  state?: string;

  @Column()
  country?: string;

  @Column()
  street_address?: string;

  @Column()
  customer_id?: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  // For relationship between other tables
  @ManyToOne(() => User, (user) => user.address, { onDelete: 'CASCADE' })
  user: User;
}
