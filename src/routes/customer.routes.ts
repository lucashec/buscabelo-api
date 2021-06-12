import {Router} from 'express';
import {getCustomRepository} from 'typeorm';
import CreateCustomerService from '../services/CreateCustomerService';
const customerRouter = Router();

customerRouter.post('/', async (request, response) =>{
  try{
    const {email, password} =  request.body;

    const createCustomer = new CreateCustomerService();

    const user = await createCustomer.execute({
      email,
      password
    })

    return response.send();
  } catch (err){
    return response.status(400).json({error : err.message});
  }
})

customerRouter.get('/', function(req, res) {
  res.send('hello world');
});

export default customerRouter;