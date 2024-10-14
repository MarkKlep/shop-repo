import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { FilterSignEnum } from 'src/app/core/models/filter/filter-sign.enum';
import { Order } from 'src/app/core/models/order/order.interface';
import { TableFilters } from 'src/app/core/models/table/table-filters.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {
  constructor() { }

  private fethedItemsLength = 0;

  getFetchedItemsLength(): number {
    return this.fethedItemsLength;
  }

  getOrders(filters: any, currentPage: number, sortOptions: any): Observable<Order[]> {
    const storedOrders = of(localStorage.getItem('orders')).pipe(
      delay(1000),
      map(orders => {
        const parsedOrders = orders ? JSON.parse(orders) : [];
        return parsedOrders;
      })
    );

    const filteredOrders = storedOrders.pipe(
      map((orders) => {
        const filtered = this.filterItems(orders, filters);
        this.fethedItemsLength = filtered.length;
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

    return paginatedOrders;
  }

  private filterItems(items: Order[], filters: TableFilters): Order[] {
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

  private goToPage(items: Order[], currentPage: number): Order[] {
    const pageSize = 5;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return items.slice(start, end);
  }
}
