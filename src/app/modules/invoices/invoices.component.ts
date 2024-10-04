import { Component } from '@angular/core';
import { TableService } from './services/table.service';
import { Invoice } from 'src/app/core/models/invoice/invoice.interface';
import { Observable, Subscription } from 'rxjs';
import { PaginationService } from './services/pagination.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent { 
  constructor(private tableService: TableService, private paginationService: PaginationService) { }

  pageSize = 5;

  currentPage = 1;
  totalPages = 0;

  handlePageSize(pageSize: number) {
    this.pageSize = pageSize;
  }

  invoices = new Observable<Invoice[]>();
  headers: any[] = [];
  isLoading = false;
  sub = new Subscription();

  ngOnInit() {
    this.invoices = this.tableService.invoices;
    this.headers = this.tableService.headers;
    this.sub = this.tableService.backendActionTrigger.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.getInvoices();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getInvoices() {
    this.tableService.getInvoices();
  }

  onLoading(isFetchingItems: boolean) {
    this.isLoading = isFetchingItems;
  }
}
