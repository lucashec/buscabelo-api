import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(user: any): Promise<User>{
    let userAtDatabase = await this.userRepository.findById(user.id);
    
    if (!userAtDatabase){
      throw new Error('User does not exist');
    }

    Object.keys(user).forEach((key: string) => {
      if (!user[key]) {
        delete user[key];
      }
    });

    if(user["password"]) {

      user["password"] = await hash(user["password"], 8);
    
    }

    userAtDatabase = { ...userAtDatabase, ...user }


    await this.userRepository.save(userAtDatabase!);
    
    return userAtDatabase!;
  }
}
