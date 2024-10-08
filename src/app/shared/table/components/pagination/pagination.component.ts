import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  constructor() { }

  currentPage = 1;
  pageSize = 0;
  totalPages = 0;

  @Input() pagination: any = null;
  @Input() totalItems: number = 0;

  @Output() fetchCurrentPage = new EventEmitter<number>();

  ngOnInit() {
    this.currentPage = this.pagination.currentPage;
    this.pageSize = this.pagination.pageSize;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }
  
  setPage(currentPage: number) {
    this.currentPage = currentPage;
    this.fetchCurrentPage.emit(this.currentPage);
  }
}
