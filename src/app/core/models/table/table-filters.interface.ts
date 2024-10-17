import { FilterSignEnum } from "../filter/filter-sign.enum";

export interface TableFilter {
    value: string;
    sign?: FilterSignEnum;
}