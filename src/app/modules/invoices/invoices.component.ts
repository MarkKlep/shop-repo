import { Component, HostListener } from '@angular/core';
import { TableService } from './services/table.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent { 
  constructor(private tableService: TableService) {}

  @HostListener('window:mousemove')
  onMouseMove() {
    if (this.tableService.isCursorRemovingRow) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }
  }
}
