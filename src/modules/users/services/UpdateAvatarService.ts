import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/containers/providers/StorageProvider/models/IStorageProvider';

interface Request{
  user_id: string,
  avatarFileName: string,
}
injectable()
export default class UpdateAvatarService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("StorageProvide")
    private storageProvider: IStorageProvider
    ){}
  public async execute({user_id, avatarFileName}: Request): Promise<User>{

    const user = await this.userRepository.findByEmail(user_id);

    if (!user){
      throw new Error('You should be authenticated to get this');
    }

    if (user.avatar){
      await this.storageProvider.deleteFile(user.avatar);
    }
    const fileName = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = fileName;
    this.userRepository.save(user);

    return user;
  }
  
}