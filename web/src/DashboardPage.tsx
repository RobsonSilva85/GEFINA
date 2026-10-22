import { useEffect, useState } from "react";
import { Dashboard } from "./dashboardType.ts";

import SummaryCard from "./SummaryCard";
import InvoiceSummaryTable from "./InvoiceSummaryTable";
import { formatCurrency } from "./utils.ts";

export default function DashboardPage() {
    const [dashboard, setDashboard] = useState<null | Dashboard>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getDashboard() {
            try {
                const response = await fetch('/api/dashboard');

                if (!response.ok) {
                    setError('Não foi possível carregar o painel inicial. ');
                    setLoading(false);
                    return;
                }
                const datas = await response.json();
                setDashboard(datas);

            } catch (error) {
                console.error(error);
                setError('Não foi possível carregar o painel inicial. ');

            }
            setLoading(false);
        }
        getDashboard();
    }, []);

    if (loading) return <p> Carregando painel inicial... </p>
    if (error !== null || dashboard === null) return <p>{error}</p>

    return <div>
        <h1>Painel Inicial</h1>
        <div className="sumary-cards">
            <SummaryCard label="Total recebido: " value={formatCurrency(dashboard?.totals.paid)} />
            <SummaryCard label="Total pendente: " value={formatCurrency(dashboard.totals.pending)} />
            <SummaryCard label="Faturas: " value={String(dashboard.totals.invoiceCount)} />
            <SummaryCard label="Clientes: " value={String(dashboard.totals.customerCount)} />
        </div>

        <div className="sumary-tables">

            <InvoiceSummaryTable
                title="Faturas Recentes"
                datelabel="Emissão"
                invoices={dashboard.recentInvoices}
                date={(invoice) => invoice.issueDate}

            />
            <InvoiceSummaryTable
                title="Faturas Atrasadas"
                datelabel="Vencimento"
                invoices={dashboard.overdueInvoices}
                date={(invoice) => invoice.dueDate}

            />
        </div>


    </div>;
}