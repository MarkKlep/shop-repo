import { Component, ViewChild, ElementRef } from '@angular/core';
import { TableService } from '../../services/table.service';
import { FilterService } from '../../services/filter.service';
import { Invoice } from 'src/app/core/models/invoice/invoice.interface';
import { InvoiceStatus } from 'src/app/core/models/invoice/invoice-status.enum';
import { combineLatest, map, Observable } from 'rxjs';
import { SignFilterEnum } from '../../services/filter.service';

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

  visibleInvoices$: Observable<Invoice[]> = this.tableService.invoices;

  fetchData$ = this.tableService.fetchData;

  constructor(private tableService: TableService, private filterService: FilterService) {
    this.visibleInvoices$ = combineLatest([
      this.tableService.invoices,
      this.filterService.dateFilter,
      this.filterService.signFilter,
      this.filterService.statusFilter,
      this.filterService.numberFilter,
      this.filterService.numberFilterSign,
      this.filterService.nameFilter,
    ]).pipe(
      map(([invoices, dataFilter, signfilter]) => {
        if(!dataFilter) return invoices;

        if(signfilter === SignFilterEnum.ALL) return invoices;
        else if(signfilter === SignFilterEnum.MORE) {
          return invoices.filter(invoice => invoice.date > dataFilter);
        }
        else if(signfilter === SignFilterEnum.LESS) {
          return invoices.filter(invoice => invoice.date < dataFilter);
        }
        else if(signfilter === SignFilterEnum.EQUAL) {
          return invoices.filter(invoice => invoice.date === dataFilter);
        }

        return [];
      }),
      map(invoices => {
        const statusFilter = this.filterService.statusFilter.value;
        if(!statusFilter || statusFilter === 'All') return invoices;

        return invoices.filter(invoice => invoice.status === statusFilter);
      }),
      map(invoices => {
        const numberFilter = this.filterService.numberFilter.value;
        if(!numberFilter) return invoices;

        const signFilter = this.filterService.numberFilterSign.value;
        if(signFilter === SignFilterEnum.ALL) return invoices;

        if(signFilter === SignFilterEnum.MORE) {
          return invoices.filter(invoice => +invoice.number > numberFilter);
        }
        else if(signFilter === SignFilterEnum.LESS) {
          return invoices.filter(invoice => +invoice.number < numberFilter);
        }
        else if(signFilter === SignFilterEnum.EQUAL) {
          return invoices.filter(invoice => +invoice.number === numberFilter);
        }

        return [];
      }),
      map(invoices => {
        const nameFilter = this.filterService.nameFilter.value;
        if(!nameFilter) return invoices;

        return invoices.filter(invoice => invoice.name.includes(nameFilter));
      }),
    )
  }

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

  sortBy(column: string, option: 'asc' | 'desc') {
    this.tableService.sortBy(column, option);
  }

  handleDateRange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.filterService.dateFilter.next(value);
  }

  handleDateFilterSign(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value as any;

    this.filterService.signFilter.next(value);
  }

  handleStatusFilter(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value as InvoiceStatus | 'All';

    this.filterService.statusFilter.next(value);
  }

  handleInputNumberFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    const parsedValue = +value;
    if(isNaN(parsedValue)) return;
    console.log(parsedValue);
    this.filterService.numberFilter.next(parsedValue);
  }

  handleNumberFilterSign(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value as SignFilterEnum;

    this.filterService.numberFilterSign.next(value);
  }

  handleInputNameFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.filterService.nameFilter.next(value);
  }
}
