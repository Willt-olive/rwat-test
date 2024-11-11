import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PcInformation} from '../pcinformation';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pc-information',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="pcInformation.photo"
        alt="photo of {{ pcInformation.name }}"
        crossorigin
      />
      <h2 class="listing-heading">{{ pcInformation.name }}</h2>
      <p class="listing-location">{{ pcInformation.colour }}</p>
      <a [routerLink]="['/details', pcInformation.id]">Learn More</a>
    </section>
  `,
  styleUrls: ['./pc-information.component.css']
})
export class PcInformationComponent {
    @Input() pcInformation!: PcInformation;
}
