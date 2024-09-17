import { Component } from '@angular/core';
import { TableService } from '../../services/table.service';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-table-panel',
  templateUrl: './table-panel.component.html',
  styleUrls: ['./table-panel.component.scss']
})
export class TablePanelComponent {
  constructor(private tableService: TableService, private paginationService: PaginationService) { }

  handleAddInvoice() {
    this.tableService.handleAddInvoice();
  }

  handleRemoveRowMode() {
    this.tableService.isCursorRemovingRow = !this.tableService.isCursorRemovingRow;
  }

  get isCursorRemovingRow() {
    return this.tableService.isCursorRemovingRow;
  }

  handlePageSize(event: Event) {
    const target = event.target as HTMLSelectElement;
    const pageSize = +target.value;

    this.paginationService.setPageSize(pageSize);
  }
}
