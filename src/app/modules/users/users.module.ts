import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserService } from './services/user.service';
import { StoreModule } from '@ngrx/store';
import * as fromState from './store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/effects/users.effects';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { MatTableModule } from '@angular/material/table';
import { UsersComponent } from './users.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    AgGridModule,
    AgGridAngular,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    StoreModule.forFeature(fromState.usersFeatureKey, fromState.reducers, { metaReducers: fromState.metaReducers }),
    EffectsModule.forFeature([UsersEffects])
  ],
  providers: [
    UserService,
    provideNativeDateAdapter()
  ]
})
export class UsersModule { }
