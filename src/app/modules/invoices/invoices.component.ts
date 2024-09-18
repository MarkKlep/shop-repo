import { Component } from '@angular/core';
import { TableService } from './services/table.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent { 
  pageSize = 5;

  handlePageSize(pageSize: number) {
    this.pageSize = pageSize;
  }
}
