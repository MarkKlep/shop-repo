import { Component } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  constructor() { }

  currentPage = 0;
  totalPages = 0;

  ngOnInit() {
    // this.paginationService.getTotalItems().subscribe(totalItems => {
    //   this.totalPages = this.paginationService.getTotalPages();
    //   console.log('total = ', this.totalPages)
    // });

    // this.paginationService.getCurrentPage().subscribe(page => {
    //   this.currentPage = page;
    // });
  }
  
  setPage(page: number) {
    //this.paginationService.setPage(page);
  }
}
