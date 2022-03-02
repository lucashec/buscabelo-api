import { inject, injectable } from 'tsyringe';
import IRatingDTO from '../dtos/IRatingDTO';
import Provider from '../infra/typeorm/entities/Provider';
import IProviderRepository from '../repositories/IProviderRepository';
import IRatingRepository from '../repositories/IRatingRepository';

interface IRating {
  rating_number: number,
  provider: Provider
}

@injectable()
export default class UpdateRatingAverageService {
  constructor(
    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,
    @inject('RatingRepository')
    private ratingRepository: IRatingRepository,
  ) {}

  public async execute(rating: IRating): Promise<Provider> { 
  const resultRating = await this.ratingRepository.create(rating);
  let provider = await this.providerRepository.findById(resultRating.provider.toString());
  provider!.rating_average = await this.ratingRepository.getRatingAverage(resultRating.provider.toString());
  provider = await this.providerRepository.save(provider!);
  
  return provider;
  }
}
