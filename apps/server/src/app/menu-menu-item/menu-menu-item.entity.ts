import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'menuMenuItem' })
export class MenuMenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  menuId: number;

  @Column()
  menuItemId: number;
}
