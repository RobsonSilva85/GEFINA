import { useState, useEffect } from "react";
import SummaryCardProps from "./SummaryCard";
import InvoiceSummuaryTable from "./InvoiceSummaryTable";
import { Dashboard } from "./dashboardType";
import { formatCurrency } from "./utils";

export default function DashboardPage() {
    const [dashboard, setDashboard] = useState<null | Dashboard>(null);
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {


        async function getDashboard() {
            try {
                const response = await fetch("/api/dashboard")
                if (!response.ok) {
                    setError('Não foi possível carregar o painel inicial.')
                    setLoading(false)
                    return;
                }
                const data: Dashboard = await response.json();
                setDashboard(data);
            } catch (error) {
                console.error(error);
                setError('Não foi possível carregar o painel inicial.')
            }
            setLoading(false)
        }
        getDashboard();
    }, [])
    if(loading) return <p>Carregando painel.....</p>
    if (error !== null || dashboard === null) return <p>{error}</p>
    
    return <div>
        <h1>Painel Inicial</h1>
        <div className="summary-cards">   
        <SummaryCardProps label ='Total recebido:' value={formatCurrency(dashboard.totals.paid)}/>
        <SummaryCardProps label ='Total pendente:' value={formatCurrency(dashboard.totals.pending)}/>
        <SummaryCardProps label ='Faturas:' value={String(dashboard.totals.invoiceCount)}/>
        <SummaryCardProps label ='Clientes:' value={String(dashboard.totals.customerCount)}/>
       </div>  

        <div className='summary-tables'>
            <InvoiceSummuaryTable
            title='Faturas Recentes'
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
    
    </div>
    
}