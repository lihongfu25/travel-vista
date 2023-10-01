import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'userRole' })
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  roleId: string;
}
