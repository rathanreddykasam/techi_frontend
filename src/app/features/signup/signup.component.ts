/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { ValidationMessages } from '../../shared/services/validation-messages';
import { catchError, of, tap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'uac-signup',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  validationMessages;
  signupForm: FormGroup;
  errorMessage: string;
  readonly dialog = inject(MatDialog);

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.validationMessages = ValidationMessages.validation_messages;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.signupForm = this.fb.group({
      username: new FormControl(),
      password: new FormControl(),
      mobile: new FormControl(),
      email: new FormControl(),
    });
  }

  onSubmit() {
    this.authService
      .signup({
        username: this.signupForm.value.username,
        password: this.signupForm.value.password,
        mobile: this.signupForm.value.mobile,
        email: this.signupForm.value.email,
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
