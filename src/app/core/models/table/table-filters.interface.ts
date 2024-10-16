import { FilterSignEnum } from "../filter/filter-sign.enum";

export interface TableFilters {
    value: string;
    sign?: FilterSignEnum;
}