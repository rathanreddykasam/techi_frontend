/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { loadUsers, deleteUser } from './store/actions/users.actions';
import { MatDialog } from '@angular/material/dialog';
import * as fromUsers from './store';
import { GridEditIconComponent } from '../../shared/components/grid-edit-fields/grid-edit-icon.component';
import { GridDeleteIconComponent } from '../../shared/components/grid-edit-fields/grid-delete-icon.component';
import { Router } from '@angular/router';
import { selectUsers } from './store/selectors/user-selector.selectors';
import { GridViewIconComponent } from '../../shared/components/grid-edit-fields/grid-view-icon.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationMessages } from '../../shared/services/validation-messages';

@Component({
  selector: 'uac-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy {
  usersState$: Observable<any>;
  destroyed$: Subject<any> = new Subject<any>();
  userSearchForm: FormGroup;
  validationMessages: any;
  tableData: any;
  gridOptions;
  themeClass = "ag-theme-quartz";
  domLayout = "autoHeight";
  isLoading = false;
  private gridApi;

  constructor(
    private store: Store<fromUsers.UsersState>,
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.validationMessages = ValidationMessages.validation_messages;
    this.initializeForm();
    this.loadGridOptions();
    this.usersState$ = store.select(selectUsers);
  }

  ngOnInit(): void {
    this.subscribeUsers();
  }

  subscribeUsers(){
    this.usersState$.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      if (data?.loading) this.isLoading = true;
      if (data?.users) {
        this.tableData = data?.users;
        this.gridOptions.rowData = this.tableData;
        if (this.gridApi) {
          this.gridApi.setGridOption("rowData", this.tableData);
        }
      }
    })
  }

  onGridReady(params): void {
    this.gridApi = params.api;
  }

  initializeForm() {
    this.userSearchForm = this.fb.group({
      agency: ['PSJ'],
      userName: [''],
      firstName: [''],
      lastName: [''],
    })
  }

  loadGridOptions() {
    this.gridOptions = {
      // Row Data
      rowData: [],

      // Column Definitions
      columnDefs: [
        { field: "Id", flex: 1 },
        { field: "Agency", flex: 2 },
        { field: "Department", flex: 2 },
        { field: "Section", flex: 2 },
        { field: 'Class', flex: 2 },
        { field: 'UserId', flex: 4 },
        { field: 'LastName', flex: 2 },
        { field: 'FirstName', flex: 2 },
        { field: 'PhoneNumber', flex: 3 },
        {
          flex: 0.5, minWidth: 50,
          cellRenderer: GridViewIconComponent,
          cellRendererParams: {
            onClick: this.onClickCharge.bind(this),
          },
        },
        {
          flex: 0.5, minWidth: 50,
          cellRenderer: GridEditIconComponent,
          cellRendererParams: {
            onClick: this.onClickCharge.bind(this),
          },
        },
        {
          flex: 0.5, minWidth: 50,
          cellRenderer: GridDeleteIconComponent,
          cellRendererParams: {
            onClick: this.onClickCharge.bind(this),
          }
        }
      ],

      // Other Grid Options
      pagination: true,
      rowSelection: 'single',
      domLayout: 'autoHeight'
    };
  }

  addUser() {
    this.router.navigate(['/users', 'add', 0]);
  }

  onClickCharge(e: any) {
    if (e.event == 'delete') {
      this.store.dispatch(deleteUser({ data: e?.rowData }))
    } else {
      this.router.navigate([`/users`, e.event, e?.rowData?.Id]);
    }
  }

  searchUser() {
    this.store.dispatch(loadUsers({ params: this.userSearchForm.value }));
  }

  resetForm() {
    this.userSearchForm.reset();
  }

  isFormValid(): boolean {
    if (this.userSearchForm.invalid) return false;
    else return true;
  }


  ngOnDestroy(): void {
    this.destroyed$.closed;
  }

}