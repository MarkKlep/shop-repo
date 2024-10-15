import { InvoiceStatus } from './invoice-status.enum';

export interface Invoice {
    id: string;
    digit: string;
    name: string;
    date: string;
    status: InvoiceStatus;
    image: string;
}