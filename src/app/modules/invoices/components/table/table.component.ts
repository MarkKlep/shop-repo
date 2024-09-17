import { Component, ViewChild, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import { TableService } from '../../services/table.service';
import { FilterService } from '../../services/filter.service';
import { Invoice } from 'src/app/core/models/invoice/invoice.interface';
import { InvoiceStatus } from 'src/app/core/models/invoice/invoice-status.enum';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { SignFilterEnum } from '../../services/filter.service';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  readonly columnNames = ['number', 'name', 'date', 'status', 'image'];

  readonly statuses = [
    { value: InvoiceStatus.CREATED, label: 'Created' },
    { value: InvoiceStatus.PAID, label: 'Paid' },
    { value: InvoiceStatus.CANCELLED, label: 'Cancelled' }
  ];

  visibleInvoices$: Observable<Invoice[]> = this.tableService.invoices;
  fetchData$ = this.tableService.fetchData;

  items: Invoice[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  private paginationSubscription = new Subscription();

  constructor(
    private tableService: TableService,
    private filterService: FilterService,
    private paginationService: PaginationService
  ) {
    this.visibleInvoices$ = combineLatest([
      this.tableService.invoices,
      this.filterService.dateFilter,
      this.filterService.signFilter,
      this.filterService.statusFilter,
      this.filterService.numberFilter,
      this.filterService.numberFilterSign,
      this.filterService.nameFilter,
      this.paginationService.currentPage$
    ]).pipe(
      map(([invoices, dataFilter, signfilter, statusFilter, numberFilter, numberFilterSign, nameFilter, page]) => {
        let filteredInvoices = invoices;
    
        if (dataFilter) {
          if (signfilter === SignFilterEnum.ALL) {
            filteredInvoices = filteredInvoices;
          } else if (signfilter === SignFilterEnum.MORE) {
            filteredInvoices = filteredInvoices.filter(invoice => invoice.date > dataFilter);
          } else if (signfilter === SignFilterEnum.LESS) {
            filteredInvoices = filteredInvoices.filter(invoice => invoice.date < dataFilter);
          } else if (signfilter === SignFilterEnum.EQUAL) {
            filteredInvoices = filteredInvoices.filter(invoice => invoice.date === dataFilter);
          }
        }
    
        if (statusFilter && statusFilter !== 'All') {
          filteredInvoices = filteredInvoices.filter(invoice => invoice.status === statusFilter);
        }
    
        if (numberFilter) {
          if (numberFilterSign === SignFilterEnum.ALL) {
            filteredInvoices = filteredInvoices;
          } else if (numberFilterSign === SignFilterEnum.MORE) {
            filteredInvoices = filteredInvoices.filter(invoice => +invoice.number > numberFilter);
          } else if (numberFilterSign === SignFilterEnum.LESS) {
            filteredInvoices = filteredInvoices.filter(invoice => +invoice.number < numberFilter);
          } else if (numberFilterSign === SignFilterEnum.EQUAL) {
            filteredInvoices = filteredInvoices.filter(invoice => +invoice.number === numberFilter);
          }
        }
    
        if (nameFilter) {
          filteredInvoices = filteredInvoices.filter(invoice => invoice.name.includes(nameFilter));
        }
    
        const pageSize = this.paginationService.getPageSize();
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        this.totalPages = Math.ceil(filteredInvoices.length / pageSize);
        this.items = filteredInvoices.slice(start, end);
    
        return this.items;
      })
    );
  }

  @ViewChild('inputField') inputField!: ElementRef;

  ngAfterViewChecked() {
    if (this.inputField) {
      this.inputField.nativeElement.focus();
    }
  }

  ngOnInit() {
    this.paginationSubscription.add(
      this.paginationService.currentPage$.subscribe(page => {
        this.currentPage = page;
        this.loadPageData();
      })
    );

    this.visibleInvoices$.subscribe(invoices => {
      this.paginationService.setTotalItems(invoices.length);
      this.totalPages = this.paginationService.getTotalPages();
      this.loadPageData();
    });

    const savedInvoices = localStorage.getItem('invoices');

    if (savedInvoices) {
      const parsedData = JSON.parse(savedInvoices);
      const invoices = parsedData.map((invoice: Invoice) => ({
        ...invoice,
        image: atob(invoice.image),
      }));

      this.tableService.invoices.next(invoices);
    }
  }

  ngOnDestroy() {
    this.paginationSubscription.unsubscribe();
  }

  loadPageData() {
    this.visibleInvoices$.subscribe(invoices => {
      const pageSize = this.paginationService.getPageSize();
      const start = (this.currentPage - 1) * pageSize;
      const end = start + pageSize;
      this.items = invoices.slice(start, end);
    });
  }

  setPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.paginationService.setPage(page);
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
    if (isNaN(parsedValue)) return;
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
