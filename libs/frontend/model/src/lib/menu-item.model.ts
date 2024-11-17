import { Menu } from './menu.model';

export class MenuItem {
  id!: number;
  label!: string;
  link!: string;
  icon!: string;
  sort!: number;
  parentId!: number;
  createdAt!: Date;
  updatedAt!: Date;
  children!: MenuItem[];
  menu!: Menu;
}
