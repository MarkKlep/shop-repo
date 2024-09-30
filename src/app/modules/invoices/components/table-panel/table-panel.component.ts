import { Component } from '@angular/core';
import { TableService } from '../../services/table.service';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-table-panel',
  templateUrl: './table-panel.component.html',
  styleUrls: ['./table-panel.component.scss']
})
export class TablePanelComponent {
  constructor(private paginationService: PaginationService) { }

  handlePageSize(event: Event) {
    const target = event.target as HTMLSelectElement;
    const pageSize = +target.value;

    this.paginationService.setPageSize(pageSize);
  }
}
