import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { OrdersroutingModule } from './orders-routing.module';
import { PanelModule } from 'src/app/core/panel/panel.module';



@NgModule({
  declarations: [
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    OrdersroutingModule,
    PanelModule
  ]
})
export class OrdersModule { }
