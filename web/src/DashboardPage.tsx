import { useEffect, useState } from 'react';
import type { Dashboard } from './dashboardType';
import InvoiceSummuaryTable from './InvoiceSummaryTable';
import SummaryCardProps from './SummaryCard';
import { formatCurrency } from './utils';

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<null | Dashboard>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDashboard() {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          setError('Não foi possível carregar o painel inicial.');
          setLoading(false);
          return;
        }
        const data: Dashboard = await response.json();
        setDashboard(data);
      } catch (error) {
        console.error(error);
        setError('Não foi possível carregar o painel inicial.');
      }
      setLoading(false);
    }
    getDashboard();
  }, []);
  if (loading) return <p className=" text-sm text-text-muted">Carregando painel.....</p>;
  if (error !== null || dashboard === null)
    return <p className="text-overdue">{error}</p>;

  return (
    <>
      <h1 className="text-xl font-semibold mb-7 text-center">Painel Inicial</h1>
      <div className="flex gap-4">
        <SummaryCardProps
          label="Total recebido:"
          value={formatCurrency(dashboard.totals.paid)}
        />
        <SummaryCardProps
          label="Total pendente:"
          value={formatCurrency(dashboard.totals.pending)}
        />
        <SummaryCardProps
          label="Faturas:"
          value={String(dashboard.totals.invoiceCount)}
        />
        <SummaryCardProps
          label="Clientes:"
          value={String(dashboard.totals.customerCount)}
        />
      </div>

      <div className="flex gap-6 mt-8">
        <InvoiceSummuaryTable
          title="Faturas Recentes"
          datelabel="Emissão"
          invoices={dashboard.recentInvoices}
          date={(invoice) => invoice.issueDate}
        />
        <InvoiceSummuaryTable
          title="Faturas Atrasadas"
          datelabel="Vencimento"
          invoices={dashboard.overdueInvoices}
          date={(invoice) => invoice.dueDate}
        />
      </div>

      <small className="fixed bottom-0 left-[calc(50%+120px)] -translate-x-1/2">
        {' '}
        &copy; 2026. Gefina - Gestão financeira simples e eficiente.
      </small>
    </>
  );
}
