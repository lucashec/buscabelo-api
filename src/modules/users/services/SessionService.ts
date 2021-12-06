import { compare } from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import User from '../infra/typeorm/entities/User';
import authConfig from '@config/auth'
import IUserRepository from '../repositories/IUserRepository'

interface Request{
  email:string,
  password: string,
}

interface Response{
  user: User,
  token: string,
}

export default class SessionService{
  constructor(private userRepository: IUserRepository){}

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
