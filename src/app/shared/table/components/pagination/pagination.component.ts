import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  constructor() { }

  currentPage = 1;
  pageSize = 5;
  totalPages = 0;

  @Input() totalLength = 0;

  @Output() pageChange = new EventEmitter<number>();

  ngOnChanges() {
    this.totalPages = Math.ceil(this.totalLength / this.pageSize);
  }
  
  setPage(currentPage: number) {
    this.currentPage = currentPage;
    this.pageChange.emit(currentPage);
  }
}
