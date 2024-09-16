import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InvoicesComponent } from './invoices.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableComponent } from './components/table/table.component';
import { TablePanelComponent } from './components/table-panel/table-panel.component';
import { PaginationModule } from '../pagination/pagination.module';



@NgModule({
  declarations: [
    InvoicesComponent,
    TableComponent,
    TablePanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    InvoicesRoutingModule,
    SharedModule,
    PaginationModule
  ]
})
export class InvoicesModule { }
