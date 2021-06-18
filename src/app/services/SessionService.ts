import { compare } from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import {getRepository} from 'typeorm';
import User from '../models/User';
import authConfig from '../../config/auth'

interface Request{
  email:string,
  password: string,
}

interface Response{
  user: User,
  token: string,
}

export default class SessionService{
  public async execute({email, password}: Request): Promise<Response>{
    const userRepository = getRepository(User);

    const user =  await userRepository.findOne({
      where:{email}
    });

    if(!user){
      throw new Error('email/password did not match');
    }

    const passwordMatched =  await compare(password, user.password)

    if(!passwordMatched){
      throw new Error('email/password did not match');
    }
    const {secret, expiresIn} = authConfig.jwt
    const token =  sign({},
      authConfig.jwt.secret,{
        subject: user.id,
        expiresIn,
      }
      )
    return {
      user,
      token
    }
  }
} 
