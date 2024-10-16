import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { TableHeader } from 'src/app/core/models/table/table-header.interface';
import { HeaderTypes } from 'src/app/core/models/table/header-types.enum';
import { TableFilter } from 'src/app/core/models/table/table-filters.interface';
import { FilterSignEnum } from 'src/app/core/models/filter/filter-sign.enum';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  constructor() { }

  filters$ = new BehaviorSubject<{ [key: string]: TableFilter }>({});

  HeaderTypes = HeaderTypes;
  FilterSignEnum = FilterSignEnum;

  @Input() headers: any[] = [];
  @Input() data: any = {};

  items: any[] = [];
  totalLength = 0;

  @Output() fetchItems = new EventEmitter<any>();

  isLoading = false;
  currentPage = 1;

  headerType = '';
  isAscending = false;

  ngOnInit() {
    this.initTableFilters();

    this.filters$.subscribe(filters => {
      this.isLoading = true;
      this.fetchItems.emit({
        filters,
        currentPage: this.currentPage,
        sortOptions: {
          headerType: this.headerType,
          isAscending: this.isAscending
        },
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('data' in changes) {
      this.items = this.data.items;
      this.totalLength = this.data.totalLength;

      this.isLoading = false;
    }
  }

  initTableFilters() {
    for (let header of this.headers) {
      switch (header.type) {
        case HeaderTypes.STATUS:
          const prev = this.filters$.value[header.label];
          this.filters$.next({
            ...this.filters$.value,
            [header.label]: {
              value: prev?.value || ''
            }
          });
          break;
        case HeaderTypes.DATE:
        case HeaderTypes.NUMBER:
          const prev2 = this.filters$.value[header.label];
          this.filters$.next({
            ...this.filters$.value,
            [header.label]: {
              value: prev2?.value || '',
              sign: prev2?.sign || FilterSignEnum.EQUALS
            }
          });
          break;
        case HeaderTypes.NAME:
          const prev3 = this.filters$.value[header.label];
          this.filters$.next({
            ...this.filters$.value,
            [header.label]: {
              value: prev3?.value || ''
            }
          });
          break;
        default:
          this.filters$.next({
            ...this.filters$.value,
            [header.label]: null
          });
          break;
      }
    }
  }

  getValue(item: any, headerField: string) {
    return item[headerField];
  }

  filterItems(label: string, event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;

    const prev = this.filters$.value[label];
    this.filters$.next({
      ...this.filters$.value,
      [label]: { 
        ...prev,
        [name]: value 
      }
    });
  }

  sortBy(header: TableHeader, isAscending: boolean) {
    this.headerType = header.field;
    this.isAscending = isAscending;

    this.isLoading = true;
    this.fetchItems.emit({
      filters: this.filters$.value,
      sortOptions: {
        headerType: this.headerType,
        isAscending
      },
      currentPage: this.currentPage,
    });
  }

  setPage(currentPage: number) {
    this.currentPage = currentPage;

    this.isLoading = true;
    this.fetchItems.emit({
      filters: this.filters$.value,
      sortOptions: {
        headerType: this.headerType,
        isAscending: this.isAscending
      },
      currentPage,
    });
  }

  resetFilters() {
    this.headerType = '';
    this.filters$.next({});
  }
}
