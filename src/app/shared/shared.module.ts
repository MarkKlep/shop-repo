import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './components/panel/panel.component';
import { RouterModule } from '@angular/router';
import { TableComponent } from './components/table/table.component';



@NgModule({
  declarations: [PanelComponent, TableComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PanelComponent,
    TableComponent
  ]
})
export class SharedModule { }
