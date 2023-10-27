import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MenuItem } from '../menu-item/menu-item.entity';
import { Role } from '../role/role.entity';

@Entity({ name: 'menu' })
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  roleId: string;

  @CreateDateColumn({
    type: 'timestamp',
    precision: null,
    default: () => 'NOW()',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: null,
    default: () => 'NOW()',
  })
  public updatedAt: Date;

  @OneToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @ManyToMany(() => MenuItem, (menuItem) => menuItem.menus, { cascade: true })
  @JoinTable({
    name: 'menuMenuItem',
    joinColumn: {
      name: 'menuId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'menuItemId',
      referencedColumnName: 'id',
    },
  })
  menuItems: MenuItem[];
}
