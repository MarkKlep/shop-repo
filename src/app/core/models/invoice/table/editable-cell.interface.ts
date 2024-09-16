import { Invoice } from '../invoice.interface';

export interface EditableCell {
    row: Invoice;
    column: string;
}