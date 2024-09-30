import { Component } from '@angular/core';
import { TableService } from './services/table.service';
import { Invoice } from 'src/app/core/models/invoice/invoice.interface';
import { Observable } from 'rxjs';

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

  columnNames: (keyof Invoice)[] = [];
  invoices = new Observable<Invoice[]>();
  headers = this.tableService.headers;

  constructor(private tableService: TableService) { 
    this.columnNames = this.tableService.columnNames;
    this.invoices = this.tableService.invoices;
  }
}
