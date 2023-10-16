import { Transform, Type, plainToInstance } from 'class-transformer';
import { User } from './user.model';

export class Role {
  id!: string;
  name!: string;
  slug!: string;
  level!: number;
  createdAt!: Date;
  updatedAt!: Date;

  @Type(() => User)
  @Transform(({ value }) =>
    Array.isArray(value) && value.length > 0
      ? value.map((item: User) => plainToInstance(User, item))
      : []
  )
  users!: User[];
}
