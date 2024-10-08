import { TableHeader } from './table-header.interface';
import { Pagination } from './pagination.interface';
import { TableFilters } from './table-filters.interface';

export interface TableConfig {
    headers: TableHeader[];
    filters: TableFilters;
    pagination: Pagination,
}