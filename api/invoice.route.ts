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

function parseId(value: string): number | undefined {
  const id = Number(value);

  if (!Number.isInteger(id) || id < 1) return undefined;

  return id;
}
router.get('/', async (_request, response) => {
  const invoices = await findAllInvoices();
  response.status(200).json(invoices);
});

router.get('/:id', async (request, response) => {
  const id = Number(+request.params.id);
  if (!id) {
    response.status(400).json({
      error: {
        status: 400,
        message: 'Identificador inválido. '
      }
    });
    return;
  }
  const invoice = await findInvoicesById(id);
  if (!invoice) response.status(404).json({
    error: {
      status: 404,
      message: 'Fatura não encontrada. '
    }
  })


});

router.post('/', async (request, response) => {

  const invoice = await insertInvoice(request.body);
  if (!invoice) response.status(404).json({
    error: {
      status: 404,
      message: 'Fatura não encontrada. '
    }
  })
});

router.put('/:id', async (request, response) => {
  const id = parseId(request.params.id);
  if (!id) {
    response.status(400).json({
      error: {
        status: 400,
        message: 'Identificador inválido. '
      }
    });
    return;
  }});

  router.delete('/:id', async (request, response) => {
    const deleted = await removeInvoice(Number(request.params.id));
    const id = parseId(request.params.id);
    if (!id) {
      response.status(400).json({
        error: {
          status: 400,
          message: 'Identificador inválido. '
        }
      });
      return;
    }

  });

export default router;
