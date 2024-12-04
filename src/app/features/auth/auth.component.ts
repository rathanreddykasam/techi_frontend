import { Component } from '@angular/core';
import { MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'uac-auth',
  standalone: true,
  imports: [
    MatDialogModule,
    LoginComponent,
    MatTabsModule,
    MatDialogTitle,
    SignupComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {}