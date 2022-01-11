import { compare } from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import User from '../infra/typeorm/entities/User';
import authConfig from '@config/auth'
import IUserRepository from '../repositories/IUserRepository'
<<<<<<< HEAD
=======
import { injectable, inject } from 'tsyringe';
>>>>>>> master

interface Request{
  email:string,
  password: string,
}

interface Response{
  user: User,
  token: string,
}
<<<<<<< HEAD

export default class SessionService{
  constructor(private userRepository: IUserRepository){}
=======
@injectable()
export default class SessionService{
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
    ){}
>>>>>>> master

  public async execute({email, password}: Request): Promise<Response>{

    const user = await this.userRepository.findByEmail(email);

    if(!user){
      throw new Error('email/password did not match');
    }

    const passwordMatched =  await compare(password, user.password)

    if(!passwordMatched){
      throw new Error('email/password did not match');
    }
    const {secret, expiresIn} = authConfig.jwt
    const token =  sign({id:user.id},
        secret,{
        expiresIn,}
      )
    return {
      user,
      token
    }
  }
} 
