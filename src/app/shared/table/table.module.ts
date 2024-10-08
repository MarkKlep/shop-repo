import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PaginationComponent } from './components/pagination/pagination.component';



@NgModule({
  declarations: [TableComponent, LoaderComponent, PaginationComponent],
  imports: [
    CommonModule
  ],
  exports: [TableComponent]
})
export class TableModule { }
