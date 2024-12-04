/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    //Clone request to add Authorization header
    const clonedRequest = token
      ? req.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      : req;

    return next.handle(req).pipe(
      // Handle errors
      catchError((err: HttpErrorResponse) => {
        const { error, status } = err;
        if (status) {
          this.snackbar.open('Oops something went wrong!', 'Dismiss', {
            duration: 3000,
            verticalPosition: 'bottom',
          });
        }
        return throwError(() => new Error(error));
      })
    );
  }
}
