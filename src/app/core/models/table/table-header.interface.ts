import { HeaderTypes } from './header-types.enum';

export interface TableHeader {
    label: string;
    field: string;
    type: HeaderTypes;
    options?: string[];
}