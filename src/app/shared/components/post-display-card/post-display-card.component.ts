import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'uac-post-display-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './post-display-card.component.html',
  styleUrl: './post-display-card.component.scss',
})
export class PostDisplayCardComponent {
  @Input() isMiniPost = false;
  @Output() viewPost = new EventEmitter<number>();
}
