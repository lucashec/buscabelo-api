import Image from "../infra/typeorm/entities/Image";
import IImageDTO from "../dtos/IImageDTO";

export default interface IImageRepository{
    create(imageDTO: IImageDTO): Promise<Image>;
    findImageByServiceId(id: number):Promise<Image[] | undefined>;
}