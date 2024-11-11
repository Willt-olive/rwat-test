import {Routes} from '@angular/router';
import {PcComponent} from './pc/pc.component';
import {DetailsComponent} from './details/details.component';

const routeConfig: Routes = [
  {
    path: '',
    component: PcComponent,
    title: 'Pc',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Pc details',
  },
];
export default routeConfig;