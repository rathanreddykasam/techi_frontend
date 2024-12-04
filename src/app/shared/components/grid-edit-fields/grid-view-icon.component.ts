import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'scc-grid-view-icon',
  standalone: true,
  imports: [MatIconModule],
  template:`<mat-icon class="mr-10 cursor-pointer" matTooltip="description" aria-hidden="false" aria-label="description Icon" fontIcon="description" (click)="editRow()"></mat-icon>`,
})
export class GridViewIconComponent implements ICellRendererAngularComp {
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
        event: 'view',
        rowData: this.params.node.data
      }
      this.params.onClick(params);

    }
  }
}
