import { Component } from '@angular/core';
import { InvoiceApiService } from './services/invoiceApi.service';
import { Invoice } from 'src/app/core/models/invoice/invoice.interface';
import { FilterSignEnum } from 'src/app/core/models/invoice/filter/filter-sign.enum';
import { HeaderTypes } from 'src/app/core/models/invoice/table/header-types.enum';
import { TableFilters } from 'src/app/core/models/invoice/table/table-filters.interface';
import { TableHeader } from 'src/app/core/models/invoice/table/table-header.interface';
import { InvoiceStatus } from 'src/app/core/models/invoice/invoice-status.enum';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent { 
  constructor(private invoiceApi: InvoiceApiService) { }

  readonly config: TableHeader[] = [
    { label: 'Number', type: HeaderTypes.NUMBER, options: [
      FilterSignEnum.ALL,
      FilterSignEnum.EQUALS,
      FilterSignEnum.LESS,
      FilterSignEnum.MORE
    ], },
    { label: 'Name', type: HeaderTypes.NAME },
    { label: 'Date', type: HeaderTypes.DATE, options: [
      FilterSignEnum.ALL,
      FilterSignEnum.EQUALS,
      FilterSignEnum.LESS,
      FilterSignEnum.MORE
    ], },
    { label: 'Status', type: HeaderTypes.STATUS, 
      options: [
      InvoiceStatus.CANCELLED,
      InvoiceStatus.CREATED,
      InvoiceStatus.PAID
    ] },
    { label: 'Image', type: HeaderTypes.IMAGE }
  ];

  invoices: Invoice[] = [];
  invoicesLength = 0;

  getInvoices(config: any) {
    const filters = config.filters as TableFilters;
    const sortOptions = config.sortOptions;
    const currentPage = config.currentPage as number;

    this.invoiceApi.getInvoices(filters, currentPage, sortOptions).subscribe((dbData) => {
      this.invoices = dbData.items;
      this.invoicesLength = dbData.amountOfItems;
    });
  }
}
