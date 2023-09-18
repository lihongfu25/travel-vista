import { Exclude } from 'class-transformer';
export class UserTransformer {
  id: string;
  email: string;
  username: string;
  @Exclude()
  password: string;
  firstName: string;
  lastName: string;
  status: boolean;
  image: string;
  phoneNumber: string;
  verifyToken: string;
  verified: boolean;
  verifiedAt: Date;
  @Exclude()
  loginFailed: number;
  createdAt: Date;
  updatedAt: Date;
}
