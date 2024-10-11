import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InvoicesComponent } from './invoices.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { TableModule } from 'src/app/shared/table/table.module';
import { PanelModule } from 'src/app/core/panel/panel.module';



@NgModule({
  declarations: [
    InvoicesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    InvoicesRoutingModule,
    TableModule,
    PanelModule,
  ]
})
export class InvoicesModule { }
