import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromHome from './store';
import { loadHomePosts } from './store/actions/home.actions';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../features/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'uac-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly dialog = inject(MatDialog);

  title = 'WELCOME';
  homePageDisclaimer = ``;

  constructor(private store: Store<fromHome.HomeState>, public router: Router) {
    //this.openDialog();
    this.store.dispatch(loadHomePosts());
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  viewPost(id) {
    this.router.navigate([`/user-posts/${id}`]);
  }
}
