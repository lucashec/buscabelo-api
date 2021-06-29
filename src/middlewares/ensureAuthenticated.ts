import {Request, Response, NextFunction} from 'express'
import {verify} from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload{
  id: string,
  iat: number,
  exp: number
}
export default function ensureAuthenticated(
  request: Request, 
  response: Response, 
  next: NextFunction
  ): void{
  const authHeader =  request.headers.authorization;

  if(!authHeader){
    throw new Error('JWT token not found');
  }
  const [,token] = authHeader.split(' ');
  try{
    const decoded =  verify(token, authConfig.jwt.secret);
    const {id} = decoded as TokenPayload
    
     request.user = {
      id: id,
     }
    return next();

  } catch{
    throw new Error('Invalid JWT token');
  }
  
}