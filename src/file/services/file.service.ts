import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { join } from 'path';

export enum FileType {
  Image = 'image',
}

@Injectable()
export class FileService {
  createFile(file: Express.Multer.File): string {
    try {
      const fileExtention = file.originalname.split('.').pop();
      const fileName = `${uuid.v4()}.${fileExtention}`;
      const filePath = join(__dirname, '..', '..', '..', 'public');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(join(filePath, fileName), file.buffer);

      return fileName;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

