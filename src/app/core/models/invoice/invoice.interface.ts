import { InvoiceStatus } from './invoice-status.enum';

export interface Invoice {
    id: string;
    number: string;
    name: string;
    date: string;
    status: InvoiceStatus;
    image: string;
    [index: string | InvoiceStatus]: string;
}