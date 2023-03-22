import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { RoleVariant } from '../roles.types';
import { UserEntity } from '../../users/entities/user.entity';

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    nullable: false,
    enum: RoleVariant,
  })
  variant: RoleVariant;

  @OneToMany(() => UserEntity, (user) => user.role)
  @JoinTable()
  users: UserEntity[];
}
