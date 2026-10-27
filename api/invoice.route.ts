import { response, Router } from 'express';
import {
  findAllInvoices,
  findInvoicesById,
  insertInvoice,
  modifyInvoice,
  removeInvoice
} from './invoice.service.ts';
import { error } from 'node:console';
import { request } from 'node:http';
import handleError from './error.middleware.ts';


const router = Router();

router.get('/', async (_request, response) => {
 const invoices = await findAllInvoices();
    response.status(200).json(invoices);
});

router.get('/:id', async (request, response) => {
  const id = Number(+request.params.id);
    const invoice = await findInvoicesById(id);


});

router.post('/', async (request, response) => {
  
 const invoice = await insertInvoice(request.body);
    if (!invoice) response.status(404).json({
      error: {
        status: 404,
        message: 'Fatura não encontrada. '
}})
});

router.put('/:id', async (request, response) => {
 const invoice = await modifyInvoice(

      Number(request.params.id),
      request.body
 )
});

router.delete('/:id', async (request, response) => {
  const deleted = await removeInvoice(Number(request.params.id));
 
});

export default router;
