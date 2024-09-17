import { Component, Input } from '@angular/core';
import { PaginationService } from '../invoices/services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  constructor(private paginationService: PaginationService) { }
  @Input() currentPage = 0;
  @Input() totalPages = 0;

  setPage(page: number) {
    this.paginationService.setPage(page);
  }
}
