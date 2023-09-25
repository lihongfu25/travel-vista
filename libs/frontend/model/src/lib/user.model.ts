import { plainToInstance, Transform, Type } from 'class-transformer';

import { Role } from './role.model';
export class User {
  id!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  status!: number;
  username!: string;
  password!: string;
  phoneNumber!: string;
  image!: string;
  verifiedAt!: Date;
  deletedAt!: Date;
  createdAt!: Date;
  updatedAt!: Date;

  @Type(() => Role)
  @Transform(({ value }) =>
    Array.isArray(value) && value.length > 0
      ? value.map((item: Role) => plainToInstance(Role, item))
      : []
  )
  roles!: Role[];

  getFullName(): string {
    return `${this.lastName} ${this.firstName}`;
  }

  isAdmin(): boolean {
    return (
      this.roles.map((role) => role.slug).includes('admin') ||
      this.roles.map((role) => role.slug).includes('superadmin')
    );
  }
}
