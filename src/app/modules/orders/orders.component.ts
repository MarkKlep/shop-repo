import { Component } from '@angular/core';
import { OrderApiService } from './services/order-api.service';
import { TableHeader } from 'src/app/core/models/table/table-header.interface';
import { HeaderTypes } from 'src/app/core/models/table/header-types.enum';
import { Order } from 'src/app/core/models/order/order.interface';
import { FilterSignEnum } from 'src/app/core/models/filter/filter-sign.enum';
import { OrderStatus } from 'src/app/core/models/order/order-status.enum';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  constructor(private orderApi: OrderApiService) { }

  readonly config: TableHeader[] = [
    {
      label: 'ID',
      field: 'id',
      type: HeaderTypes.NUMBER,
      options: [
        FilterSignEnum.EQUALS,
        FilterSignEnum.LESS,
        FilterSignEnum.MORE
      ]
    },
    {
      label: 'Date',
      field: 'date',
      type: HeaderTypes.DATE,
      options: [
        FilterSignEnum.EQUALS,
        FilterSignEnum.LESS,
        FilterSignEnum.MORE
      ]
    },
    {
      label: 'Name',
      field: 'name',
      type: HeaderTypes.NAME
    },
    {
      label: 'Status',
      field: 'status',
      type: HeaderTypes.STATUS,
      options: [
        OrderStatus.DONE,
        OrderStatus.IN_PROGRESS,
        OrderStatus.WAITING
      ]
    }
  ];

  orders: Order[] = [];
  ordersLength = 0;

  orderData: { items: Order[], totalLength: number } = {
    items: [],
    totalLength: 0
  }

  getOrders(requestOptions: any) {
    const filters = requestOptions.filters;
    const sortOptions = requestOptions.sortOptions;
    const currentPage = requestOptions.currentPage;

    this.orderApi.getOrders(filters, currentPage, sortOptions).subscribe((dbData) => {
      this.orderData = dbData;
    });
  }
}
