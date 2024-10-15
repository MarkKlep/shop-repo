import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [TableComponent, LoaderComponent, PaginationComponent],
  imports: [
    CommonModule,
    FormsModule 
  ],
  exports: [TableComponent]
})
export class TableModule { }
