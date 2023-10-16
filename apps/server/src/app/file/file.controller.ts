import {
  Controller,
  Inject,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ApiMultiFile, ApiResponseService, Auth } from '@server/common';
import {
  SERVER_CONFIGURATION,
  ServerConfigurationInterface,
} from '@server/configuration';
import { Multer, diskStorage } from 'multer';
import { join } from 'path';
import { FileTransformer } from './file.transformer';
@Controller('file')
@ApiTags('File')
export class FileController {
  public file: Multer;

  constructor(
    private response: ApiResponseService,
    @Inject(SERVER_CONFIGURATION) private config: ServerConfigurationInterface
  ) {}

  @Post('upload')
  @Auth()
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: join(__dirname, 'public', 'uploads'),
        filename: (req, file: Express.Multer.File, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}-${file.originalname}`);
        },
      }),
      fileFilter: (req, file: Express.Multer.File, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|xlsx|xls|csv)$/)) {
          return new Error('Only image, excel or csv files are allowed!');
        }
        cb(null, true);
      },
    })
  )
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    const result = files.map((item) => ({
      ...item,
      ...{
        url: `${this.config.appUrl}/uploads/${item.filename}`,
      },
      ...{
        path: `/uploads/${item.filename}`,
      },
    }));
    return this.response.collection(result, FileTransformer);
  }

  @Post('upload-image')
  @Auth()
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: join(__dirname, 'public', 'uploads'),
        filename: (req, file: Express.Multer.File, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}-${file.originalname}`);
        },
      }),
      fileFilter: (req, file: Express.Multer.File, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|svg|webp)$/)) {
          return new Error('Only image files are allowed!');
        }
        cb(null, true);
      },
    })
  )
  uploadImage(@UploadedFiles() files: Array<Express.Multer.File>) {
    const result = files.map((item) => ({
      ...item,
      ...{
        url: `${this.config.appUrl}/uploads/${item.filename}`,
      },
      ...{
        path: `/uploads/${item.filename}`,
      },
    }));
    return this.response.collection(result, FileTransformer);
  }
}
