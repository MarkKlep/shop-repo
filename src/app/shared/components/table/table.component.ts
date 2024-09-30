import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceStatus } from 'src/app/core/models/invoice/invoice-status.enum';

enum HeaderTypes {
  NUMBER = 'number',
  NAME = 'name',
  DATE  = 'date',
  STATUS = 'status',
  IMAGE = 'image'
}

interface TableHeader {
  label: string;
  type: HeaderTypes;
  options: any;
}


@Component({
  selector: 'app-table1',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() headers: TableHeader[] = [];
  @Input() items$: Observable<any[]> | null = null;

  HeaderTypes = HeaderTypes;
  readonly statuses = [InvoiceStatus.CANCELLED, InvoiceStatus.CREATED, InvoiceStatus.PAID];

  getValue(item: any, headerType: HeaderTypes) {
    return item[headerType];
  }
}
