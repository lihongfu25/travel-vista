import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Menu } from '../menu/menu.entity';

@Entity({ name: 'menuItem' })
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  link: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ default: 0 })
  sort: number;

  @Column({ nullable: true })
  parentId: number;

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

  @ManyToMany(() => Menu, (menu) => menu.menuItems)
  menus: Menu[];

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.children)
  @JoinColumn({ name: 'parentId' })
  parent: MenuItem;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.parent)
  children: MenuItem[];
}
