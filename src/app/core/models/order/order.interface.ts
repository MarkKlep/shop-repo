import { OrderStatus } from "./order-status.enum";

export interface Order {
    number: string;
    name: string;
    date: string;
    status: OrderStatus;
}