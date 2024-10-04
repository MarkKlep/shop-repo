import { Component } from '@angular/core';
import { PaginationService } from '../invoices/services/pagination.service';
import { TableService } from '../invoices/services/table.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  constructor(private paginationService: PaginationService, private tableService: TableService) { }

  currentPage = 0;
  totalPages = 0;

  ngOnInit() {
    this.paginationService.getTotalItems().subscribe(totalItems => {
      this.totalPages = this.paginationService.getTotalPages();
    });

    this.paginationService.getCurrentPage().subscribe(page => {
      this.currentPage = page;
    });
  }
  
  setPage(page: number) {
    this.paginationService.setPage(page);
  }
}
