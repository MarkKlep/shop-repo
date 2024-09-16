import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './components/panel/panel.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PanelComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [PanelComponent]
})
export class SharedModule { }
