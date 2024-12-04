/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ValidationMessages } from '../../shared/services/validation-messages';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'uac-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  validationMessages;
  loginForm: FormGroup;
  errorMessage: string;
  readonly dialog = inject(MatDialog);

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.validationMessages = ValidationMessages.validation_messages;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit() {
    this.authService
      .login({
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      })
      .pipe(
        // Process response
        tap((response: any) => {
          this.authService.saveAuthDetails({
            authToken: response.data.accessToken,
            id: response.data.user_id,
            name: response.data.username,
            email: response.data.email,
          });
          this.dialog.closeAll();
          //this.router.navigate(['/dashboard']); // Adjust navigation as needed
        }),
        // Handle errors
        catchError(() => {
          this.errorMessage = 'Invalid email or password';
          return of(null); // Return a safe observable
        })
      )
      .subscribe();
  }

  validate(): boolean {
    return true;
  }
}
