import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InvoiceStatus } from 'src/app/core/models/invoice/invoice-status.enum';
import { FilterSignEnum } from 'src/app/core/models/invoice/filter/filter-sign.enum';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  
  numberFilter = new BehaviorSubject<number | null>(null);
  numberFilterSign = new BehaviorSubject<FilterSignEnum>(FilterSignEnum.EQUALS);

  dateFilter = new BehaviorSubject<string>('');
  signFilter = new BehaviorSubject<FilterSignEnum>(FilterSignEnum.EQUALS);

  nameFilter = new BehaviorSubject<string>('');

  statusFilter = new BehaviorSubject<InvoiceStatus | 'All'>('All');

}
