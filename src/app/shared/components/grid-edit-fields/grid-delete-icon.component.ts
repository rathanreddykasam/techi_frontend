import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'scc-grid-delete-icon',
  standalone: true,
  imports: [MatIconModule],
  template:`<mat-icon class="mr-10 cursor-pointer" matTooltip="Delete" aria-hidden="false" aria-label="Delete Icon" fontIcon="delete" (click)="deleteRow()"></mat-icon>`,
})
export class GridDeleteIconComponent implements ICellRendererAngularComp {
  params;
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams) {
    return true;
  }

  deleteRow(){
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: 'delete',
        rowData: this.params.node.data
      }
      this.params.onClick(params);

    }
  }
}
