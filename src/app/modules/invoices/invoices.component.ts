import { Component } from '@angular/core';
import { TableService } from './services/table.service';
import { Invoice } from 'src/app/core/models/invoice/invoice.interface';
import { BehaviorSubject } from 'rxjs';
import { FilterSignEnum } from 'src/app/core/models/invoice/filter/filter-sign.enum';
import { HeaderTypes } from 'src/app/core/models/invoice/table/header-types.enum';
import { Pagination } from 'src/app/core/models/invoice/table/pagination.interface';
import { TableFilters } from 'src/app/core/models/invoice/table/table-filters.interface';
import { TableHeader } from 'src/app/core/models/invoice/table/table-header.interface';
import { TableConfig } from 'src/app/core/models/invoice/table/table-config.interface';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent { 
  constructor(private tableService: TableService) { }

  invoices: Invoice[] = [];
  readonly headers: TableHeader[] = [
    { label: 'Number', type: HeaderTypes.NUMBER },
    { label: 'Name', type: HeaderTypes.NAME },
    { label: 'Date', type: HeaderTypes.DATE },
    { label: 'Status', type: HeaderTypes.STATUS },
    { label: 'Image', type: HeaderTypes.IMAGE }
  ];
  filters: TableFilters = {
    number: '',
    numberSign: FilterSignEnum.EQUALS,
    name: '',
    date: '',
    dateSign: FilterSignEnum.EQUALS,
    status: 'All',
  };
  pagination: Pagination = {
    pageSize: 5,
    currentPage: 1,
    totalPages: 0,
  };

  config: TableConfig = {
    headers: this.headers,
    filters: this.filters,
    pagination: this.pagination,
  };

  fetchingItems$ = new BehaviorSubject<boolean>(false);

  getInvoices(config: any) {
    const { filters, sortOptions, pagination } = config;

    this.fetchingItems$.next(true);

    this.tableService.getInvoices(filters, sortOptions, pagination).subscribe(dbInvoices => {
      this.invoices = dbInvoices;
      this.fetchingItems$.next(false);
    });
  }
}
