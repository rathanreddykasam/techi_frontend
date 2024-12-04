/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationMessages } from '../../../../shared/services/validation-messages';
import { Store } from '@ngrx/store';
import * as fromUsers from '../../store';
import {
  clearUserDataState,
  getUser,
  loadUserRoles,
  saveUser,
} from '../../store/actions/users.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  selectUser,
  selectUserRoles,
} from '../../store/selectors/user-selector.selectors';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'uac-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit, OnDestroy {
  destroyed$: Subject<any> = new Subject<any>();
  label = 'Add';
  validationMessages;
  userForm: FormGroup;
  isValidated = false;
  userDataState$: Observable<any>;
  userRolesState$: Observable<any>;
  user: any;
  roles: any;
  isLoading = false;
  gridOptions;
  formAction = 'Add';
  themeClass = 'ag-theme-quartz';
  domLayout = 'autoHeight';
  rowSelection = 'multiple';
  private gridApi: GridApi;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<fromUsers.UsersState>
  ) {
    this.validationMessages = ValidationMessages.validation_messages;
    this.userDataState$ = store.select(selectUser);
    this.userRolesState$ = store.select(selectUserRoles);

    this.userDataState$.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      if (data?.loading) {
        this.isLoading = true;
      }
      if (data?.user) {
        this.isLoading = false;
        this.user = data.user;
        this.loadForm();
      }
    });

    this.userRolesState$.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      if (data?.roles) {
        this.roles = data?.roles;
        this.loadRolesGrid(data.roles);
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadUserRoles());
    this.route.paramMap.subscribe((params) => {
      this.label = this.formAction = params.get('action');
      const id = parseInt(params.get('id'));
      if (['edit', 'view'].includes(this.formAction) && id) {
        this.formAction = ['edit'].includes(this.formAction)
          ? 'Update'
          : 'view';
        this.store.dispatch(getUser({ id }));
      } else {
        this.loadForm();
      }
    });
  }

  loadForm() {
    const user = this.user;
    this.userForm = this.fb.group({
      Id: [user?.Id ?? 0],
      Agency: [user?.Agency ?? 'PSJ'],
      UserId: [user?.UserId],
      LastName: [user?.LastName],
      FirstName: [user?.FirstName],
      Email: [user?.Email],
      PhoneNumber: [user?.PhoneNumber],
      PhoneNumberExtension: [user?.PhoneNumberExtension],
      IpGroup: [user?.IpGroup],
      ActiveDateTime: [user?.ActiveDateTime],
      InactiveDateTime: [user?.InactiveDateTime],
      SoapAccessWithoutPassword: [user?.SoapAccessWithoutPassword],
      IsLocked: [user?.IsLocked],
      Department: [user?.Department],
      Section: [user?.Section],
      Class: [user?.Class],
      UserAgreementDate: [user?.UserAgreementDate],
      DefaultPrinter: [user?.DefaultPrinter],
      MaxConcurrentLogons: [user?.MaxConcurrentLogons ?? 1],
      TerminalGroup: [user?.TerminalGroup],
      AuthorizationGroup: [user?.AuthorizationGroup],
      CopyAuthorizationFrom: [user?.CopyAuthorizationFrom],
      UserRoles: [user?.UserRoles],
    });
    if (this.formAction == 'view') this.userForm.disable();
  }

  loadRolesGrid(roles: any) {
    this.gridOptions = {
      // Row Data
      rowData: roles,

      // Column Definitions
      columnDefs: [
        {
          field: 'select',
          headerName: '',
          flex: 1,
          checkboxSelection: true,
        },
        { field: 'Id', flex: 1.5 },
        { field: 'Agency', flex: 2 },
        { field: 'Description', flex: 4 },
      ],

      // Other Grid Options
      pagination: false,
      rowSelection: 'single',
      domLayout: 'autoHeight',
    };
  }

  addUser() {
    this.isValidated = true;
    this.store.dispatch(saveUser({ userData: this.userForm.value }));
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.userForm.patchValue({
      UserRoles: selectedRows.map((row) => row.Id),
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  cancel() {
    this.router.navigate([`/users`]);
  }

  ngOnDestroy(): void {
    this.destroyed$.closed;
    this.store.dispatch(clearUserDataState());
  }
}
