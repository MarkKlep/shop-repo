import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { OrdersroutingModule } from './orders-routing.module';
import { PanelModule } from 'src/app/core/panel/panel.module';
import { TableModule } from 'src/app/shared/table/table.module';



@NgModule({
  declarations: [
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    OrdersroutingModule,
    PanelModule,
    TableModule
  ]
})
export class OrdersModule { }
