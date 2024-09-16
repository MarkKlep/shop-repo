import { Component } from '@angular/core';
import { InvoiceStatus } from 'src/app/core/models/invoice/invoice-status.enum';
import { Invoice } from 'src/app/core/models/invoice/invoice.interface';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-table-panel',
  templateUrl: './table-panel.component.html',
  styleUrls: ['./table-panel.component.scss']
})
export class TablePanelComponent {
  constructor(private tableService: TableService) { }

  private saveInvoices(invoices: Invoice[]) {
    const storedInvoices: Invoice[] = invoices.map(invoice => ({
      ...invoice,
      image: btoa(invoice.image),
    }));
    localStorage.setItem('invoices', JSON.stringify(storedInvoices));
  }

  handleAddInvoice() {
    const newInvoice = {
      id: Math.random().toString(36).substr(2, 9),
      number: '',
      name: '',
      date: '',
      status: InvoiceStatus.CREATED,
      image: ''
    }

    const prevInvoices = this.tableService.invoices.value;
    const updatedInvoices: Invoice[] = [...prevInvoices, newInvoice];
    this.tableService.invoices.next(updatedInvoices);
    
    this.saveInvoices(updatedInvoices);
  }

  handleRemoveRowMode() {
    this.tableService.isCursorRemovingRow = !this.tableService.isCursorRemovingRow;
  }

  get isCursorRemovingRow() {
    return this.tableService.isCursorRemovingRow;
  }
}
