import Service from "@modules/services/infra/typeorm/entities/Service";

export default interface IImageDTO{
    service: Service,
    url: string | undefined
  }