import {
  BadRequestException,
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
  environment,
  SERVER_CONFIGURATION,
  ServerConfigurationInterface,
} from '@server/configuration';
import { UploadApiOptions } from 'cloudinary';
import { Multer } from 'multer';
import { FileCommonService } from '../common/file-common/file-common.service';
import { FileTransformer } from './file.transformer';

@Controller('file')
@ApiTags('File')
export class FileController {
  public file: Multer;

  constructor(
    private response: ApiResponseService,
    private fileCommonService: FileCommonService,
    @Inject(SERVER_CONFIGURATION) private config: ServerConfigurationInterface
  ) {}

  @Post('upload')
  @Auth()
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile()
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    const uploads = files.map(async (file) => {
      const fileUrl = await this.fileCommonService.uploadFileToCloudinary(file);
      return {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        url: fileUrl,
      };
    });

    const results = await Promise.all(uploads);

    return this.response.collection(results, FileTransformer);
  }

  @Post('upload-image')
  @Auth()
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      fileFilter: (req, file: Express.Multer.File, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|svg|webp)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed!'),
            false
          );
        }
        cb(null, true);
      },
    })
  )
  async uploadImage(@UploadedFiles() files: Array<Express.Multer.File>) {
    const uploads = files.map(async (file) => {
      const options: UploadApiOptions = {
        resource_type: 'image',
        format: 'webp',
        folder: `${environment.appName}/images`,
        public_id: this.fileCommonService.randomFileName(file),
      };
      const url = await this.fileCommonService.uploadFileToCloudinary(
        file,
        options
      );
      return {
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url,
      };
    });

    const results = await Promise.all(uploads);

    return this.response.collection(results, FileTransformer);
  }

  @Post('upload-svg')
  @Auth()
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile()
  @UseInterceptors(
    FilesInterceptor('files', 1, {
      fileFilter: (req, file: Express.Multer.File, cb) => {
        if (!file.originalname.match(/\.svg$/)) {
          return cb(
            new BadRequestException('Only SVG files are allowed!'),
            false
          );
        }
        cb(null, true);
      },
    })
  )
  async uploadSvg(@UploadedFiles() files: Array<Express.Multer.File>) {
    const uploads = files.map(async (file) => {
      const options: UploadApiOptions = {
        resource_type: 'auto',
        folder: `${environment.appName}/images`,
        public_id: this.fileCommonService.randomFileName(file),
      };
      const url = await this.fileCommonService.uploadFileToCloudinary(
        file,
        options
      );
      return {
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url,
      };
    });

    const results = await Promise.all(uploads);

    return this.response.collection(results, FileTransformer);
  }
}
