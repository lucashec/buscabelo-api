import Rating from '@modules/providers/infra/typeorm/entities/Rating';
import IRatingDTO from '../dtos/IRatingDTO';

export default interface IRatingRepository{
    create(rating: IRatingDTO): Promise<Rating>;
    getRatingAverage(id: string): Promise<number>;
}