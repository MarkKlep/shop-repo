import { OrderStatus } from "./order-status.enum";

export interface Order {
    id: string;
    name: string;
    date: string;
    status: OrderStatus;
}