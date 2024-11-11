import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PcInformationComponent} from '../pc-information/pc-information.component';
import {PcInformation} from '../pcinformation';
import {PcService} from '../pc.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pc',
  standalone: true,
  imports: [CommonModule, PcInformationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="filter by colour" #filter/>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-pc-information *ngFor="let pcInformation of filteredLocationList" [pcInformation]="pcInformation"></app-pc-information>
    </section>
  `,
  styleUrls: ['./pc.component.css'],
})
export class PcComponent {
  pcInformationList: PcInformation[] = [];
  pcService: PcService = inject(PcService);
  filteredLocationList: PcInformation[] = [];

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.pcInformationList;
      return;
    }
    this.filteredLocationList = this.pcInformationList.filter((pcInformation) =>
      pcInformation?.colour.toLowerCase().includes(text.toLowerCase()),
    );
  }

  constructor() {
    this.pcInformationList = this.pcService.getAllPcInformation();
    this.filteredLocationList = this.pcInformationList;
  }
}
