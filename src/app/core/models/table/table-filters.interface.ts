import { FilterSignEnum } from "../filter/filter-sign.enum";

export interface TableFilters {
    number: string;
    numberSign: FilterSignEnum;
    name: string;
    date: string;
    dateSign: FilterSignEnum;
    status: string;
}