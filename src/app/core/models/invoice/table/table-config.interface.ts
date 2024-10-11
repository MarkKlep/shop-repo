import { TableHeader } from './table-header.interface';
import { TableFilters } from './table-filters.interface';

export interface TableConfig {
    headers: TableHeader[];
    filters: TableFilters;
}