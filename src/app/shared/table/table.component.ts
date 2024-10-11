import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Invoice } from 'src/app/core/models/invoice/invoice.interface';
import { TableHeader } from 'src/app/core/models/invoice/table/table-header.interface';
import { HeaderTypes } from 'src/app/core/models/invoice/table/header-types.enum';
import { TableFilters } from 'src/app/core/models/invoice/table/table-filters.interface';
import { FilterSignEnum } from 'src/app/core/models/invoice/filter/filter-sign.enum';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  constructor() {}

  HeaderTypes = HeaderTypes;
  FilterSignEnum = FilterSignEnum;

  @Input() items: Invoice[] = [];
  @Input() totalLength = 0;
  @Input() config: any = null;

  @Output() fetchItems = new EventEmitter<any>();

  headers: TableHeader[] = [];
  filters: TableFilters | any = null;

  isLoading = false;
  currentPage = 1;

  ngOnInit() {
    this.headers = this.config.headers;
    this.filters = this.config.filters;

    this.isLoading = true;
    this.fetchItems.emit({
      filters: this.filters,
      currentPage: this.currentPage,
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
    this.filters = { ...this.filters, [name]: value };

    this.fetchItems.emit({
      filters: this.filters,
      currentPage: this.currentPage,
    });
  }

  sortBy(header: TableHeader, isAscending: boolean) {
    const headerType = header.type;
    this.isLoading = true;

    this.fetchItems.emit({
      filters: this.filters,
      sortOptions: {headerType, isAscending},
      currentPage: this.currentPage,
    });
  }

  setPage(currentPage: number) {
    this.currentPage = currentPage;
    this.isLoading = true;

    this.fetchItems.emit({
      filters: this.filters,
      currentPage,
    });
  }
}
