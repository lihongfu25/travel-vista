import { Exclude } from 'class-transformer';

export class FileTransformer {
  @Exclude()
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  @Exclude()
  destination: string;
  filename: string;
  path: string;
  size: number;
}
