import {Component} from '@angular/core';
import {PcComponent} from './pc/pc.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PcComponent],
  template: `
    <main>
      <header class="brand-name">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
      </header>
      <section class="content">
        <app-pc></app-pc>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pc';
}
