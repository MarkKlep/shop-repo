import { Component } from '@angular/core';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-table-panel',
  templateUrl: './table-panel.component.html',
  styleUrls: ['./table-panel.component.scss']
})
export class TablePanelComponent {
  constructor(private tableService: TableService) { }

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
    console.log(pageSize);
  }
}
