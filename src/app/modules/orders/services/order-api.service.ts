import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { FilterSignEnum } from 'src/app/core/models/filter/filter-sign.enum';
import { Order } from 'src/app/core/models/order/order.interface';
import { TableSorting } from 'src/app/core/models/table/table-sorting.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {
  constructor() { }

  getOrders(filters: any, currentPage: number, sortOptions: TableSorting): Observable<{orders: Order[], totalLength: number}> {
    const storedOrders = of(localStorage.getItem('orders')).pipe(
      delay(1000),
      map(orders => {
        const parsedOrders = orders ? JSON.parse(orders) : [];
        return parsedOrders;
      })
    );

    let totalLength = 0;

    const filteredOrders = storedOrders.pipe(
      map((orders) => {
        const filtered = this.filterItems(orders, filters);
        totalLength = filtered.length;
        return filtered;
      }),
    );

    const sortedOrders = filteredOrders.pipe(
      map((orders) => {
        const { headerType, isAscending } = sortOptions;
        if (!headerType) return orders;
        return orders.sort(this.sortBy(headerType, isAscending));
      }),
    );

    const paginatedOrders = sortedOrders.pipe(
      map((orders) => {
        return this.goToPage(orders, currentPage);
      }),
    );

    return paginatedOrders.pipe(
      map((orders) => {
        return { orders, totalLength };
      }),
    );
  }

  private filterItems(items: Order[], filters: any): Order[] {
    let filteredItems = items;

    for (const key in filters) {
      const filter = filters[key];
      if (filter) {
        const { value, sign } = filter;

        if (key === 'ID' && value) {
          switch (sign) {
            case FilterSignEnum.EQUALS:
              filteredItems = filteredItems.filter(item => item.id === value);
              break;
            case FilterSignEnum.LESS:
              filteredItems = filteredItems.filter(item => parseInt(item.id) < parseInt(value));
              break;
            case FilterSignEnum.MORE:
              filteredItems = filteredItems.filter(item => parseInt(item.id) > parseInt(value));
              break;
          }
        } else if (key === 'Name' && value) {
          filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
        } else if (key === 'Date' && value) {
          switch (sign) {
            case FilterSignEnum.EQUALS:
              filteredItems = filteredItems.filter(item => item.date === value);
              break;
            case FilterSignEnum.LESS:
              filteredItems = filteredItems.filter(item => new Date(item.date) < new Date(value));
              break;
            case FilterSignEnum.MORE:
              filteredItems = filteredItems.filter(item => new Date(item.date) > new Date(value));
              break;
          }
        } else if (key === 'Status' && value) {
          filteredItems = filteredItems.filter(item => item.status === value);
        }
      }
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

  private goToPage(items: Order[], currentPage: number): Order[] {
    const pageSize = 5;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return items.slice(start, end);
  }
}
