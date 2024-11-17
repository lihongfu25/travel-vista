import { plainToInstance, Transform, Type } from 'class-transformer';
import { Role } from './role.model';

export class Menu {
  id!: string;
  name!: string;
  roleId!: string;

  @Type(() => Role)
  @Transform(({ value }) => plainToInstance(Role, value))
  role!: Role;
}
