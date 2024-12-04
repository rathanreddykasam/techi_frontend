/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { AuthComponent } from '../auth/auth.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'uac-header',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatSidenavModule,
    MatIconModule,
    RouterModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonModule,
    MatInput,
    MatMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  user: any;
  readonly dialog = inject(MatDialog);
  title = 'TechiHicups';
  titleAbstract = 'We Helps Startups to grow!';
  active = true;
  emailFormControl = new FormControl('');

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUserDetails();
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

  logout() {
    this.authService.logout();
  }
}
