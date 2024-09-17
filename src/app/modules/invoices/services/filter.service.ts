import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InvoiceStatus } from 'src/app/core/models/invoice/invoice-status.enum';

export enum SignFilterEnum {
  ALL = 'all',
  MORE = 'more',
  LESS = 'less',
  EQUAL = 'equal'
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  
  numberFilter = new BehaviorSubject<number | null>(null);
  numberFilterSign = new BehaviorSubject<SignFilterEnum>(SignFilterEnum.ALL);

  dateFilter = new BehaviorSubject<string>('');
  signFilter = new BehaviorSubject<SignFilterEnum>(SignFilterEnum.ALL);

  nameFilter = new BehaviorSubject<string>('');

  statusFilter = new BehaviorSubject<InvoiceStatus | 'All'>('All');

  constructor() { }


}
