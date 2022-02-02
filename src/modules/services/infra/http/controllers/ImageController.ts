import { Request, Response } from 'express';
import UploadImageManager from '@modules/services/managers/UploadImageManager';
import ImageRepository from '@modules/services/infra/typeorm/repositories/ImageRepository'
import S3StorageProvider from '@shared/containers/providers/StorageProvider/implementations/S3StorageProvider';
import ServiceRepository from '../../typeorm/repositories/ServiceRepository';

export class ImageController {
  private static INSTANCE : ImageController;

  static getInstance(): ImageController{
    if (!ImageController.INSTANCE){
      ImageController.INSTANCE = new ImageController();
    }
    return ImageController.INSTANCE;
  }

  async UploadImage(request: Request, response: Response) {
    const imageRepository = new ImageRepository();
    const serviceRepository = new ServiceRepository();
    const storageRepository = new S3StorageProvider();
    try {
      const uploadImage = new UploadImageManager(serviceRepository, imageRepository, storageRepository)
      const {id} = request.params as any;
      const image = await uploadImage.execute({
          service: id,
          url: request.file?.filename
      })

      return response.json({
        success: true,
        image
      });
    }
    catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message,
      });
    }

  }
}

