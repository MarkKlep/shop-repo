import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  filters: TableFilters = {
    number: '',
    numberSign: FilterSignEnum.EQUALS,
    name: '',
    date: '',
    dateSign: FilterSignEnum.EQUALS,
    status: '',
  };

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

  ngOnChanges() {
    this.isLoading = false;
  }

  getValue(item: any, headerType: string) {
    return item[headerType];
  }

  filterItems(event: Event) {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;

    this.isLoading = true;
    this.filters = {
      ...this.filters,
      [name]: value
    };

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
      sortOptions: { headerType, isAscending },
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
    this.isLoading = true;
    this.filters = {
      number: '',
      numberSign: FilterSignEnum.EQUALS,
      name: '',
      date: '',
      dateSign: FilterSignEnum.EQUALS,
      status: '',
    };

    this.headerType = '';

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
