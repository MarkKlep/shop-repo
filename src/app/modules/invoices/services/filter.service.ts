import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InvoiceStatus } from 'src/app/core/models/invoice/invoice-status.enum';
import { FilterSignEnum } from 'src/app/core/models/invoice/filter/filter-sign.enum';

interface Filter {
  type: string;
  value?: string;
  sign?: FilterSignEnum;
  status?: InvoiceStatus | 'All';
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  numberFilter = new BehaviorSubject<string | null>(null);
  numberFilterSign = new BehaviorSubject<FilterSignEnum>(FilterSignEnum.EQUALS);

  dateFilter = new BehaviorSubject<string | null>(null);
  dateFilterSign = new BehaviorSubject<FilterSignEnum>(FilterSignEnum.EQUALS);

  nameFilter = new BehaviorSubject<string>('');

  statusFilter = new BehaviorSubject<InvoiceStatus | 'All'>('All');

  filterItems(items: any[]): any[] {
    let filteredItems = items;

    const numberFilter = this.numberFilter.getValue();
    const numberFilterSign = this.numberFilterSign.getValue();
    const nameFilter = this.nameFilter.getValue();
    const dateFilter = this.dateFilter.getValue();
    const dateFilterSign = this.dateFilterSign.getValue();
    const statusFilter = this.statusFilter.getValue();

    if (numberFilter !== null && numberFilterSign) {
      switch (numberFilterSign) {
        case FilterSignEnum.EQUALS:
          filteredItems = filteredItems.filter(item => item.number === numberFilter);
          break;
        case FilterSignEnum.MORE:
          filteredItems = filteredItems.filter(item => item.number > numberFilter);
          break;
        case FilterSignEnum.LESS:
          filteredItems = filteredItems.filter(item => item.number < numberFilter);
          break;
      }
    }

    if (nameFilter) {
      filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(nameFilter.toLowerCase()));
    }

    if (dateFilter && dateFilterSign) {
      switch (dateFilterSign) {
        case FilterSignEnum.EQUALS:
          filteredItems = filteredItems.filter(item => item.date === dateFilter);
          break;
        case FilterSignEnum.MORE:
          filteredItems = filteredItems.filter(item => item.date > dateFilter);
          break;
        case FilterSignEnum.LESS:
          filteredItems = filteredItems.filter(item => item.date < dateFilter);
          break;
      }
    }

    if (statusFilter !== 'All') {
      filteredItems = filteredItems.filter(item => item.status === statusFilter);
    }

    return filteredItems;
  }
}
