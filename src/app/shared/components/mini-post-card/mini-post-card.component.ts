import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'uac-mini-post-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './mini-post-card.component.html',
  styleUrl: './mini-post-card.component.scss',
})
export class MiniPostCardComponent {}
