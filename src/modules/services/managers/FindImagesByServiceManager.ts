import { inject, injectable } from 'tsyringe';
import IImageRepository from '../repositories/IImageRepository';
import Image from '../infra/typeorm/entities/Image'
@injectable()
export default class FindImagesByServiceManager{
  constructor(
    @inject('ImageRepository')
    private imageRepository : IImageRepository, 
  ) {}

  public async execute(id: number): Promise<Image[] | undefined> {
    const images = await this.imageRepository.findImageByServiceId(id);
    return images; 
  }
}
