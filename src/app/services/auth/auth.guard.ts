import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../../features/auth/auth.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  readonly dialog = inject(MatDialog);
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.openAuthpopup();
      this.authService.redirectUrl = state.url;
      return false;
    }
  }

  openAuthpopup(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '1000px',
      maxWidth: 'none',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
