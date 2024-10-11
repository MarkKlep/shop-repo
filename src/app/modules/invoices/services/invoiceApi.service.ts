import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { FilterSignEnum } from 'src/app/core/models/invoice/filter/filter-sign.enum';
import { Invoice } from 'src/app/core/models/invoice/invoice.interface';
import { TableFilters } from 'src/app/core/models/invoice/table/table-filters.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceApiService {
  constructor() { }

  getInvoices(filters: TableFilters, sortOptions?: any, currentPage?: number): Observable<{ items: Invoice[]; amountOfItems: number }> {
    let totalLength = 0;
    
    const storedInvoices = of(localStorage.getItem('invoices')).pipe(
      delay(1000),
      map(invoices => {
        const parsedInvoices: Invoice[] = invoices ? JSON.parse(invoices) : [];

        totalLength = parsedInvoices.length;

        return parsedInvoices.map(invoice => ({
          ...invoice,
          image: atob(invoice.image)
        }));
      })
    );
  
    const filteredInvoices = storedInvoices.pipe(
      map((invoices) => {
        if (!filters) return invoices;
        return this.filterItems(invoices, filters);
      }),
    );
  
    const sortedInvoices = filteredInvoices.pipe(
      map((invoices) => {
        if (!sortOptions) return invoices;
  
        const { headerType, isAscending } = sortOptions;
  
        return invoices.sort(this.sortBy(headerType, isAscending));
      }),
    );
  
    const paginatedInvoices = sortedInvoices.pipe(
      map((invoices) => {
        const paginated = currentPage ? this.goToPage(invoices, currentPage) : this.goToPage(invoices, 1);
        return {
          items: paginated,
          amountOfItems: totalLength,
        };
      }),
    );
  
    return paginatedInvoices;
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

    if (status !== 'All') {
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

  private goToPage(items: any[], currentPage: number) {
    const start = (currentPage - 1) * 5;
    const end = start + 5;
    return items.slice(start, end);
  }
}
