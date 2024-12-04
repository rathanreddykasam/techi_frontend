import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'uac-footer',
  standalone: true,
  imports: [MatTooltipModule, MatToolbarModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  copyright = 'Copyright - TechiHicups';
  contact = 'Contact Us';
  privacy = 'Privacy and Terms';

  release_version = 'v'; // + environment.release_version;
}
