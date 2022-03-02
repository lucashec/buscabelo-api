import Provider  from "@modules/providers/infra/typeorm/entities/Provider";

export default interface IRatingDTO{
    rating_number: number;
    provider: Provider;
}