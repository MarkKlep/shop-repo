import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { TableService } from '../../services/table.service';
import { Invoice } from 'src/app/core/models/invoice/invoice.interface';
import { InvoiceStatus } from 'src/app/core/models/invoice/invoice-status.enum';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  readonly columnNames = ['number', 'name', 'date', 'status', 'image'];

  readonly statuses = [
    { value: InvoiceStatus.CREATED, label: 'Created' },
    { value: InvoiceStatus.PAID, label: 'Paid' },
    { value: InvoiceStatus.CANCELLED, label: 'Cancelled' }
  ];

  constructor(public tableService: TableService) { }

  @ViewChild('inputField') inputField!: ElementRef;

  ngAfterViewChecked() {
    if (this.inputField) {
        this.inputField.nativeElement.focus();
    }
  }

  ngOnInit() {
    const savedInvoices = localStorage.getItem('invoices');

    if(savedInvoices) {
      const parsedData = JSON.parse(savedInvoices);
      const invoices = parsedData.map((invoice: Invoice) => ({
        ...invoice,
        image: atob(invoice.image),
      }));
      
      this.tableService.invoices.next(invoices);
    }
  }

  handleAddInvoice() {
    this.tableService.handleAddInvoice();
  }

  handleEditCellMode(row: Invoice, event: Event) {
    this.tableService.handleEditCellMode(row, event);
  }

  handleRemoveRow(id: string) {
    this.tableService.handleRemoveRow(id);
  }

  isEditableCell(row: Invoice, column: string) {
    return this.tableService.isEditableCell(row, column);
  }

  handleSaveCell(invoice: Invoice, columnName: string, event: Event) {
    this.tableService.handleSaveCell(invoice, columnName, event);
  }

  handleInputValue(id: string, col: string, event: Event) {
    this.tableService.handleInputValue(id, col, event);
  }

  getValue(invoice: Invoice, col: string) {
    return (invoice as any)[col];
  }

  handleSelectValue(id: string, col: string, event: Event) {
    this.tableService.handleSelectValue(id, col, event);
  }
}
