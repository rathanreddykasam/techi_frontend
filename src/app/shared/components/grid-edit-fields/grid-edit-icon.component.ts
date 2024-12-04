import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'scc-grid-edit-icon',
  standalone: true,
  imports: [MatIconModule],
  template:`<mat-icon class="mr-10 cursor-pointer" matTooltip="Edit" aria-hidden="false" aria-label="Edit Icon" fontIcon="edit" (click)="editRow()"></mat-icon>`,
})
export class GridEditIconComponent implements ICellRendererAngularComp {
  params;
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams) {
    return true;
  }

  editRow(){
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: 'edit',
        rowData: this.params.node.data
      }
      this.params.onClick(params);

    }
  }
}
