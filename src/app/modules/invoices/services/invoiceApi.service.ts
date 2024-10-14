import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { FilterSignEnum } from 'src/app/core/models/filter/filter-sign.enum';
import { Invoice } from 'src/app/core/models/invoice/invoice.interface';
import { TableFilters } from 'src/app/core/models/table/table-filters.interface';
import { TableSorting } from 'src/app/core/models/table/table-sorting.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceApiService {
  constructor() { }

  getInvoices(filters: TableFilters, currentPage: number, sortOptions: TableSorting): Observable<{invoices: Invoice[], totalLength: number}> {
    const storedInvoices = of(localStorage.getItem('invoices')).pipe(
      delay(1000),
      map(invoices => {
        const parsedInvoices: Invoice[] = invoices ? JSON.parse(invoices) : [];
        return parsedInvoices.map(invoice => ({
          ...invoice,
          image: atob(invoice.image)
        }));
      })
    );
  
    let totalLength = 0;

    const filteredInvoices = storedInvoices.pipe(
      map((invoices) => {
        const filtered = this.filterItems(invoices, filters);
        totalLength = filtered.length;
        return filtered;
      }),
    );
  
    const sortedInvoices = filteredInvoices.pipe(
      map((invoices) => {
        const { headerType, isAscending } = sortOptions;
        if (!headerType) return invoices;
        return invoices.sort(this.sortBy(headerType, isAscending));
      }),
    );
  
    const paginatedInvoices = sortedInvoices.pipe(
      map((invoices) => {
        return this.goToPage(invoices, currentPage);
      }),
    );
  
    return paginatedInvoices.pipe(
      map((invoices) => {
        return { invoices, totalLength };
      }),
    );
  }

  private filterItems(items: Invoice[], filters: TableFilters): Invoice[] {
    let filteredItems = items;

    const { number, numberSign, name, date, dateSign, status } = filters;

    if (number) {
      switch(numberSign) {
        case FilterSignEnum.EQUALS:
          filteredItems = filteredItems.filter(item => item.number === number);
          break;
        case FilterSignEnum.LESS:
          filteredItems = filteredItems.filter(item => item.number < number);
          break;
        case FilterSignEnum.MORE:
          filteredItems = filteredItems.filter(item => item.number > number);
          break;
      }
    }

    if (name) {
      filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (date) {
      switch(dateSign) {
        case FilterSignEnum.EQUALS:
          filteredItems = filteredItems.filter(item => item.date === date);
          break;
        case FilterSignEnum.LESS:
          filteredItems = filteredItems.filter(item => item.date < date);
          break;
        case FilterSignEnum.MORE:
          filteredItems = filteredItems.filter(item => item.date > date);
          break;
      }
    }

    if (status) {
      filteredItems = filteredItems.filter(item => item.status === status);
    }

    return filteredItems;
  }

  private sortBy(headerType: string, isAsccending: boolean) {
    return (a: any, b: any) => {
      if (isAsccending) {
        return a[headerType] > b[headerType] ? 1 : -1;
      } else {
        return a[headerType] < b[headerType] ? 1 : -1;
      }
    }
  }

  private goToPage(items: Invoice[], currentPage: number): Invoice[] {
    const pageSize = 5;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return items.slice(start, end);
  }
}
