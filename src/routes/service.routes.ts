import {Router} from 'express';
import {getCustomRepository} from 'typeorm';
import CreateServiceHelper from '../services/CreateServiceHelper';
const serviceRouter = Router();

serviceRouter.post('/', async (request, response) =>{
  try{
    const {name, description, value, provider} =  request.body;

    const createService = new CreateServiceHelper();

    const user = await createService.execute({
      name,
      description,
      value,
      provider,
    })

    return response.send();
  } catch (err){
    return response.status(400).json({error : err.message});
  }
})

export default serviceRouter;