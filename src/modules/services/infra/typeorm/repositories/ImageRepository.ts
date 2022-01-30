import {getRepository, Repository} from 'typeorm';
import Image from '../entities/Image';
import IImageDTO from '@modules/services/dtos/IImageDTO';
import IImageRepository from '@modules/services/repositories/IImageRepository';

export default class ImageRepository implements IImageRepository{
    private ormRepository : Repository<Image>

    public constructor(){
        this.ormRepository = getRepository(Image);
      }

    public async create(imageDTO: IImageDTO): Promise<Image>{
        const image = await this.ormRepository.create(imageDTO);
        
        this.ormRepository.save(imageDTO);
  
        return image;
    }
}