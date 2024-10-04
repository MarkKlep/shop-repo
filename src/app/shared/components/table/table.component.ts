import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, delay, map, Observable, of, tap } from 'rxjs';
import { InvoiceStatus } from 'src/app/core/models/invoice/invoice-status.enum';
import { FilterSignEnum } from 'src/app/core/models/invoice/filter/filter-sign.enum';
import { FilterService } from 'src/app/modules/invoices/services/filter.service';
import { PaginationService } from 'src/app/modules/invoices/services/pagination.service';

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
  selector: 'app-table1',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  constructor(private filterService: FilterService, private paginationService: PaginationService) {}

  @Input() headers: TableHeader[] = [];
  @Input() items$: Observable<any[]> | null = null;

  @Output() fetchingItems = new EventEmitter<boolean>(false);

  visibleRows$ = new Observable<any[]>();
  editableCell$ = new BehaviorSubject<EditableCell | null>(null);

  ngOnInit() {
    this.visibleRows$ = combineLatest([
      this.items$ || of([]),
      this.filterService.numberFilter,
      this.filterService.numberFilterSign,
      this.filterService.nameFilter,
      this.filterService.dateFilter,
      this.filterService.dateFilterSign,
      this.filterService.statusFilter,
      this.paginationService.currentPage$,
    ]).pipe(
      tap(() => {
        this.fetchingItems.emit(true);
      }),
      map(([items]) => this.filterService.filterItems(items)),
      map((items) => this.paginationService.goToPage(items)),
      delay(500),
      tap(() => {
        this.fetchingItems.emit(false);
      })
    );
  }
  

  HeaderTypes = HeaderTypes;
  FilterSignEnum = FilterSignEnum;
  readonly statuses = [InvoiceStatus.CANCELLED, InvoiceStatus.CREATED, InvoiceStatus.PAID];

  getValue(item: any, headerType: HeaderTypes) {
    return item[headerType];
  }

  inputNumber(event: Event) {
    const target = event.target as HTMLInputElement;
    const number = target.value;

    if(isNaN(+number)) return;

    this.filterService.numberFilter.next(number);
  }
  selectSignNumber(event: Event) {
    const target = event.target as HTMLSelectElement;
    const sign = target.value as FilterSignEnum;
    
    this.filterService.numberFilterSign.next(sign);
  }

  inputName(event: Event) {
    const target = event.target as HTMLInputElement;
    const name = target.value;

    this.filterService.nameFilter.next(name);
  }

  inputDate(event: Event) {
    const target = event.target as HTMLInputElement;
    const date = target.value;

    this.filterService.dateFilter.next(date);
  }
  selectSignDate(event: Event) {
    const target = event.target as HTMLSelectElement;
    const sign = target.value as FilterSignEnum;
    
    this.filterService.dateFilterSign.next(sign);
  }

  selectStatus(event: Event) {
    const target = event.target as HTMLSelectElement;
    const status = target.value as InvoiceStatus | 'All';

    this.filterService.statusFilter.next(status);
  }

  sortBy(header: TableHeader, isAsccending: boolean) {
    const headerType = header.type;

    this.visibleRows$ = this.visibleRows$.pipe(
      map((items) => {
        return items.sort((row1, row2) => {
          if (row1[headerType] > row2[headerType]) {
            return isAsccending ? 1 : -1;
          }
          if (row1[headerType] < row2[headerType]) {
            return isAsccending ? -1 : 1;
          }
          return 0;
        })
      })
    )
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
