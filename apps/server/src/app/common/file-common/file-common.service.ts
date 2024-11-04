import { Injectable } from '@nestjs/common';
import { environment } from '@server/configuration';
import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
const DEFAULT_UPLOAD_UPTION: UploadApiOptions = {
  resource_type: 'auto',
  folder: `${environment.appName}/uploads`,
};
@Injectable()
export class FileCommonService {
  constructor() {
    cloudinary.config({
      cloud_name: environment.cloudinaryCloudName,
      api_key: environment.cloudinaryApiKey,
      api_secret: environment.cloudinaryApiSecret,
    });
  }

  async uploadFileToCloudinary(
    file: Express.Multer.File,
    options: UploadApiOptions = DEFAULT_UPLOAD_UPTION
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(options, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        })
        .end(file.buffer);
    });
  }

  randomFileName(file: Express.Multer.File): string {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    return `${randomName}-${file.originalname}`;
  }
}
