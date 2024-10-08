import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InvoiceStatus } from 'src/app/core/models/invoice/invoice-status.enum';
import { FilterSignEnum } from 'src/app/core/models/invoice/filter/filter-sign.enum';
import { Invoice } from 'src/app/core/models/invoice/invoice.interface';

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
}

interface EditableCell {
  item: any;
  header: TableHeader;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  constructor() {}

  @Input() items: Invoice[] | null = null;
  @Input() config: any = null;
  @Input() isLoading: boolean = false;

  headers: any[] = [];
  filters: any = undefined;
  pagination: any = undefined;

  @Output() fetchItems = new EventEmitter<any>(this.filters);

  visibleRows$ = new Observable<any[]>();
  editableCell$ = new BehaviorSubject<EditableCell | null>(null);

  ngOnInit() {
    this.headers = this.config.headers;
    this.filters = this.config.filters;
    this.pagination = this.config.pagination;

    this.fetchItems.emit({filters: this.filters, sortOptions: null, pagination: this.pagination});
  }

  HeaderTypes = HeaderTypes;
  FilterSignEnum = FilterSignEnum;
  readonly statuses = [InvoiceStatus.CANCELLED, InvoiceStatus.CREATED, InvoiceStatus.PAID];

  getValue(item: any, headerType: HeaderTypes) {
    return item[headerType];
  }

  filterItems(event: Event) {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    this.filters = { ...this.filters, [name]: value };

    this.fetchItems.emit({filters: this.filters, sortOptions: null, pagination: this.pagination});
  }

  sortBy(header: TableHeader, isAscending: boolean) {
    const headerType = header.type;
    const sortOptions = { headerType, isAscending };

    this.fetchItems.emit({filters: this.filters, sortOptions, pagination: this.pagination});
  }

  setPage(currentPage: number) {
    this.pagination.currentPage = currentPage;

    this.fetchItems.emit({filters: this.filters, sortOptions: null, pagination: this.pagination});
  }

  setEditableCell(item: any, header: TableHeader | null) {
    if(!header || !item) {
      this.editableCell$.next(null);
      return;
    }

    this.editableCell$.next({ item, header });
  }

  isEdittable(item: any, header: TableHeader) {
    return this.editableCell$.value?.item === item && this.editableCell$.value?.header === header;
  }

  editCell(event: Event) {
    console.log('Editting cell');
  }
}
