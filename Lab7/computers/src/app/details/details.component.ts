import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {PcService} from '../pc.service';
import {PcInformation} from '../pcinformation';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./details.component.css'],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="pcInformation?.photo"
        alt="photo of {{ pcInformation?.name }}"
        crossorigin
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ pcInformation?.name }}</h2>
        <p class="listing-location">{{ pcInformation?.cpu }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this computer</h2>
        <ul>
          <li>Colour: {{ pcInformation?.colour }}</li>
          <li>RAM: {{ pcInformation?.memory }}</li>
          <li>Storage: {{ pcInformation?.storage }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Enquire Availability</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
})

export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  pcService = inject(PcService);
  pcInformation: PcInformation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const pcInformationId = Number(this.route.snapshot.params['id']);
    this.pcInformation = this.pcService.getPcInformationById(pcInformationId);
  }

  submitApplication() {
    this.pcService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}