import { Router } from 'express';
import {
  findAllInvoices,
  findInvoicesById
} from './invoice.service.ts';
import { error } from 'node:console';

const router = Router();

router.get('/', async (_request, response) => {
  const invoices = await findAllInvoices ();
  response.status(200).json(invoices);
});
router.get('/:id',  async (request, response) => {
  const id = Number(+request.params.id);
  const invoice =  await findInvoicesById(id);

  if (!invoice) response.status(404).json({ error: {
    status: 404,
    message: 'Fatura não encontrada. '
  }})
  response.status(200).json(invoice);

  
});

export default router;
