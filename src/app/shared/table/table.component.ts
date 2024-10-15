import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { TableHeader } from 'src/app/core/models/table/table-header.interface';
import { HeaderTypes } from 'src/app/core/models/table/header-types.enum';
import { TableFilters } from 'src/app/core/models/table/table-filters.interface';
import { FilterSignEnum } from 'src/app/core/models/filter/filter-sign.enum';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  constructor() { }

  filters: TableFilters | any = { };

  HeaderTypes = HeaderTypes;
  FilterSignEnum = FilterSignEnum;

  @Input() headers: any[] = [];
  @Input() items: any[] = [];
  @Input() totalLength = 0;

  @Output() fetchItems = new EventEmitter<any>();

  isLoading = false;
  currentPage = 1;

  headerType = '';
  isAscending = false;

  ngOnInit() {
    for (let header of this.headers) {
      this.filters[header.label] = [];
      if (header.type === HeaderTypes.STATUS) {
        this.filters[header.label] = { 
          value: '' 
        };
      } else if (header.type === HeaderTypes.DATE || header.type === HeaderTypes.NUMBER) {
        this.filters[header.label] = { 
          value: '', 
          sign: FilterSignEnum.EQUALS 
        };
      } else if (header.type === HeaderTypes.NAME) {
        this.filters[header.label] = { 
          value: '' 
        };
      }
    }

    this.isLoading = true;
    this.fetchItems.emit({
      filters: this.filters,
      currentPage: this.currentPage,
      sortOptions: {
        headerType: this.headerType,
        isAscending: this.isAscending
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if('items' in changes) {
      this.isLoading = false;
    }
  }

  getValue(item: any, headerField: string) {
    return item[headerField];
  }

  filterItems(label: string, event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;

    if(name === 'value') {
      this.filters = {
        ...this.filters,
        [label]: { 
          value, 
          sign: this.filters[label].sign 
        },
      }
    } else if(name === 'sign') {
      this.filters = {
        ...this.filters,
        [label]: { 
          value: this.filters[label].value, 
          sign: value 
        },
      }
    }

    this.isLoading = true;
    this.fetchItems.emit({
      filters: this.filters,
      currentPage: this.currentPage,
      sortOptions: {
        headerType: this.headerType,
        isAscending: this.isAscending
      },
    });
  }

  sortBy(header: TableHeader, isAscending: boolean) {
    const headerType = header.type;
    this.headerType = headerType;
    this.isAscending = isAscending;

    this.isLoading = true;
    this.fetchItems.emit({
      filters: this.filters,
      sortOptions: { 
        headerType, 
        isAscending 
      },
      currentPage: this.currentPage,
    });
  }

  setPage(currentPage: number) {
    this.currentPage = currentPage;

    this.isLoading = true;
    this.fetchItems.emit({
      filters: this.filters,
      sortOptions: {
        headerType: this.headerType,
        isAscending: this.isAscending
      },
      currentPage,
    });
  }

  resetFilters() {
    this.filters = { };
    for (let header of this.headers) {
      this.filters[header.label] = [];
      if (header.type === HeaderTypes.STATUS) {
        this.filters[header.label] = { value: '' };
      } else if (header.type === HeaderTypes.DATE || header.type === HeaderTypes.NUMBER) {
        this.filters[header.label] = { value: '', sign: FilterSignEnum.EQUALS };
      } else if (header.type === HeaderTypes.NAME) {
        this.filters[header.label] = { value: '' };
      }
    }

    this.headerType = '';

    this.isLoading = true;
    this.fetchItems.emit({
      filters: this.filters,
      currentPage: this.currentPage,
      sortOptions: {
        headerType: this.headerType,
        isAscending: this.isAscending
      },
    });
  }
}
