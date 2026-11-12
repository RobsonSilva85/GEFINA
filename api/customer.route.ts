import { Router } from 'express';
import { findCustomersOptions } from './customer.service.ts';

const route = Router();

route.get('/options', async (_request, response) => {
  const customerOptions = await findCustomersOptions();
  response.status(200).json(customerOptions);
});

export default route;
