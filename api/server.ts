import express, { response } from 'express';
import path, { join } from 'node:path';
import dashboard from './dashboard.route.ts';
import invoices from './invoice.route.ts';
import pool from './database.ts';
import handleError from './error.middleware.ts';
import { request } from 'node:http';
import { existsSync } from 'node:fs';




const app = express();
app.use(express.json());

const dist = path.join(import.meta.dirname, '..', 'web', 'dist');

app.use((request, _response, next) => {
  console.log(`${request.method} ${request.url}`);
  next();
});
app.get('/api/health', async (_request, response) => {
  try {
    const connect = await pool.query('SELECT datname FROM pg_database WHERE oid = 5;');

    response.status(200).json({
      server: 'Server is running',
      database: connect.rows[0].datname
    });

  } catch (error) {
    console.log(error);

    response.status(500).json({
      server: 'Server is running. ',
      database: 'unavaliable'
    })
  }
});

app.use('/api/dashboard', dashboard);
app.use('/api/invoices', invoices);
app.use(express.static(dist));

app.use((request) => {
  if (!request.url.startsWith('/api')) express.static(dist);
});

app.get('/', (_request, response, next) => {
  const indexPath = path.join(dist, 'index.html');

  if (existsSync(indexPath)) {
    response.sendFile(indexPath);
    return;
  }

  next();
});
app.use((_request, response) => {
  response.status(404).json({ message: 'Recurso não encontrado. ' });
});
app.listen(Number(process.env.PORT) || 3000);

app.use(handleError);