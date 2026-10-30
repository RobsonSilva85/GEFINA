import InvoiceTable from "./invoiceTable.tsx";
import { Invoice, InvoiceInput } from "./invoiceType.ts";
import { useEffect, useState, useRef } from "react";
import InvoiceForm from "./InvoiceForm.tsx";

import { getAllInvoices, createInvoice } from './invoiceApi.ts'
import { CustomerOption } from "./customerType.ts";


export default function InvoicePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [CustomerOption, setCustomersOptions] = useState<CustomerOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [dialogContent, setDialogContente] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null);
  dialogRef.current



  useEffect(() => {
    async function getInvoices() {
      try {
        const datas = await getAllInvoices();
        setInvoices(datas);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      }

      setLoading(false)
    }
    getInvoices();
  }, []);

  useEffect(() => {
    async function getCustomersOptions() {
      try {
        const response = await fetch(`/api/customers/options`);

        if (!response.ok) throw new Error('Falha ao buscar clientes. ');
        const datas = await response.json();

        setCustomersOptions(datas);
      } catch (error) {
        if (error instanceof Error) setError(error.message);

      }

    }
    getCustomersOptions();
  }, []);

  async function refresh() {
    try {
      const datas = await getAllInvoices();
    } catch (error) {
      if (error instanceof Error) throw error;
    }

  }

  async function submit(datas: InvoiceInput) {
    setBusy(true);
    setFormError(null);

    try {
      await createInvoice(datas);
      closeModal();
      await refresh();
    } catch (error) {
      if (error instanceof Error) setFormError(error.message);
    }

    setBusy(false);
  }

  if (loading) return <p>Carregando faturas.....</p>

  if (error) return <p>{error}</p>


  function openModal() {
    setFormError(null);
    setDialogContente(true);
    dialogRef.current?.showModal();
  }

  function closeModal() {
    setFormError(null);

    dialogRef.current?.close();
  }

  return <>
    <header className="page-header">
      <h1 >Faturas</h1>
      <button
        className="button-primary"
        onClick={openModal}
      >Nova Fatura</button>
    </header>

    <div className="panel">
      <InvoiceTable invoices={invoices} />
    </div>

    <dialog 
    className="invoice-modal"
    ref={dialogRef}
    onClose={() => setDialogContente(false)}
    >
      {dialogContent && <InvoiceForm
        invoice={null}
        customers={CustomerOption}
        error={formError}
        onDelete={() => null}
        onCancel={closeModal}
        onSubmit={submit}
        busy={busy}
      />}

    </dialog>
  </>


}