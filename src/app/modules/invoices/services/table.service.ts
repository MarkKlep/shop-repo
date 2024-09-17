import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, of, tap } from 'rxjs';
import { InvoiceStatus } from 'src/app/core/models/invoice/invoice-status.enum';
import { Invoice } from 'src/app/core/models/invoice/invoice.interface';
import { EditableCell } from 'src/app/core/models/invoice/table/editable-cell.interface';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  invoices = new BehaviorSubject<Invoice[]>([]);
  editableCell = new BehaviorSubject<EditableCell | null>(null);
  isCursorRemovingRow = false;

  fetchData = new BehaviorSubject<boolean>(false);

  saveInvoices(invoices: Invoice[]) {
    const storedInvoices: Invoice[] = invoices.map(invoice => ({
      ...invoice,
      image: btoa(invoice.image),
    }));

    of(storedInvoices).pipe(
      tap(() => {
        this.fetchData.next(true);
        localStorage.setItem('invoices', JSON.stringify(storedInvoices));
      }),
      delay(1000),
      tap(() => this.fetchData.next(false))
    ).subscribe();
  }

  handleAddInvoice() {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 16);
    const newInvoice = {
        id: Math.random().toString(36).substr(2, 9),
        number: '',
        name: '',
        date: formattedDate,
        status: InvoiceStatus.CREATED,
        image: ''
    };

    const prevInvoices = this.invoices.value;
    const updatedInvoices: Invoice[] = [...prevInvoices, newInvoice];
    this.invoices.next(updatedInvoices);
    this.saveInvoices(updatedInvoices);
  }

  handleRemoveRow(id: string) {
    if(this.isCursorRemovingRow) {
      const prevInvoices = this.invoices.value;
      const updatedInvoices = prevInvoices.filter(invoice => invoice.id !== id);

      this.invoices.next(updatedInvoices);
      this.saveInvoices(updatedInvoices);

      this.isCursorRemovingRow = false;
    }
  }

  handleSaveCell(invoice: Invoice, columnName: string, event: Event) {
    const target = event.target as HTMLInputElement;
    const cellValue = target.value;

    const updInvoice = {
      ...invoice,
      [columnName]: cellValue
    }

    const updatedInvoices = this.invoices.value.map(inv => {
      if(inv.id === invoice.id) return updInvoice;

      return inv;
    });

    this.invoices.next(updatedInvoices);
    this.editableCell.next(null);

    this.saveInvoices(updatedInvoices);
  }

  isEditableCell(row: Invoice, column: string) {
    const editableCell = this.editableCell.value;

    return editableCell && editableCell.row.id === row.id && editableCell.column === column;
  }

  handleEditCellMode(row: Invoice, event: Event) {
    const target = event.target as HTMLElement;
    const column = target.getAttribute('data-col');

    if(!column) return;

    this.editableCell.next({ row, column });
  }

  handleInputValue(id: string, col: string, event: Event) {
    const target = event.target as HTMLInputElement;
    const textInput = target.value.trim();

    const prevInvoices = this.invoices.value;
    const updatedInvoices: Invoice[] = prevInvoices.map(invoice => {
      if(invoice.id === id) {
        return {
          ...invoice,
          [col]: textInput
        }
      }

      return invoice;
    });

    this.invoices.next(updatedInvoices);
  }

  handleSelectValue(id: string, col: string, event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectValue = target.value;

    const prevInvoices = this.invoices.value;
    const updatedInvoices: Invoice[] = prevInvoices.map(invoice => {
      if(invoice.id === id) {
        return {
          ...invoice,
          [col]: selectValue
        }
      }

      return invoice;
    });

    this.invoices.next(updatedInvoices);
  }

  sortBy(column: string, option: 'asc' | 'desc') {
    const prevInvoices = this.invoices.value;
    const updatedInvoices = prevInvoices.sort((a, b) => {
      if(option === 'asc') {
        return (a as any)[column] > (b as any)[column] ? 1 : -1;
      } else {
        return (a as any)[column] < (b as any)[column] ? 1 : -1;
      }
    });

    this.invoices.next(updatedInvoices);
    this.saveInvoices(updatedInvoices);
  }
}
