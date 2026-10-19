import type { Invoice } from "./invoiceType";

export interface Dashboardtotals {
    paid: number;
    pending: number;
    invoiceCount: number;
    customerCount: number;

}

export interface Dashboard {
    totals: Dashboardtotals;
    recentInvoices: Invoice[];
    overdueInvoices: Invoice[];
}