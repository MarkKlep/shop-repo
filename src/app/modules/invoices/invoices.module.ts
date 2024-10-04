import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InvoicesComponent } from './invoices.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TablePanelComponent } from './components/table-panel/table-panel.component';
import { PaginationModule } from '../pagination/pagination.module';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [
    InvoicesComponent,
    TablePanelComponent,
    LoaderComponent
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
