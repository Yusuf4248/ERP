import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { Response } from "express";
import * as fs from "fs";
import * as path from "path";
import * as uuid from "uuid";

@Injectable()
export class FileService {
  async saveFile(file: any, file_path: string): Promise<string> {
    try {
      const allowedExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".gif",
        ".svg",
        ".mp4",
        ".mov",
        ".mkv",
        ".webm",
      ];

      const ext = path.extname(file.originalname).toLowerCase();

      if (!allowedExtensions.includes(ext)) {
        throw new BadRequestException(`Fayl turi ruxsat etilmagan: ${ext}`);
      }
      const extension = path.extname(file.originalname);
      const fileName = uuid.v4() + extension;
      if (!fs.existsSync(file_path)) {
        fs.mkdirSync(file_path, { recursive: true });
      }
      fs.writeFileSync(path.join(file_path, fileName), file.buffer);
      return fileName;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        message: "file saqlashda xatolik yuz berdi",
      });
    }
  }
}
