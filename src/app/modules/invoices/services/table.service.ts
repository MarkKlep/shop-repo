import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, of, tap } from 'rxjs';
import { Invoice } from 'src/app/core/models/invoice/invoice.interface';
import { EditableCell } from 'src/app/core/models/invoice/table/editable-cell.interface';
import { PaginationService } from './pagination.service';


enum HeaderTypes {
  NUMBER = 'number',
  NAME = 'name',
  DATE = 'date',
  STATUS = 'status',
  IMAGE = 'image'
}

interface TableHeader {
  label: string;
  type: HeaderTypes;
}

@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(private paginationService: PaginationService) { }

  readonly headers: TableHeader[] = [
    { label: 'Number', type: HeaderTypes.NUMBER },
    { label: 'Name', type: HeaderTypes.NAME },
    { label: 'Date', type: HeaderTypes.DATE },
    { label: 'Status', type: HeaderTypes.STATUS },
    { label: 'Image', type: HeaderTypes.IMAGE }
  ];

  invoices = new BehaviorSubject<Invoice[]>([]);

  editableCell = new BehaviorSubject<EditableCell | null>(null);

  backendActionTrigger = new BehaviorSubject<boolean>(false);

  getInvoices() {
    const storedInvoices = localStorage.getItem('invoices');
    const parsedInvoices: Invoice[] = storedInvoices ? JSON.parse(storedInvoices) : [];

    of(parsedInvoices).pipe(
      tap(() => {
        this.backendActionTrigger.next(true);
      }),
      delay(1000),
      tap(() => {
        const invoices = parsedInvoices.map(invoice => ({
          ...invoice,
          image: atob(invoice.image)
        }));
    
        this.invoices.next(invoices);
      }),
      tap(() => {
        this.backendActionTrigger.next(false);

        this.paginationService.setTotalItems(parsedInvoices.length);
      }),
    ).subscribe();
  }

}
