import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column()
  shop_id?: number;

  @Column()
  is_active?: boolean = true;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  // For relationship between other tables
}
