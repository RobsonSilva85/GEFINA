import InvoiceRow from './InvoiceRow.tsx';
import type { Invoice } from './invoiceType.ts';

interface InvoiceTableProps {
  invoices: Invoice[];
  edit: (invoice: Invoice) => void;
}

export default function InvoiceTable(props: InvoiceTableProps) {
  const theaderStyle = 'text-sm font-medium text-text-muted border-b border-border p-3';
 
  return (
    <table className='w-full border-collapse'>
      <thead>
        <tr>
          <th className={`${theaderStyle} text-left`}>Cliente</th>
          <th className={`${theaderStyle} text-left`}>Valor</th>
          <th className={theaderStyle}>Data de Emissão</th>
          <th className={theaderStyle}>Data de vencimento</th>
          <th className={theaderStyle}>Situação</th>
          <th className={theaderStyle}></th>
        </tr>
      </thead>
      <tbody>
        {props.invoices.map((invoice) => (
          <InvoiceRow key={invoice.id} invoice={invoice} edit={props.edit} />
        ))}
      </tbody>
    </table>
  );
}
