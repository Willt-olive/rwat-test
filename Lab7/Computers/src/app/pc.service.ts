import {Injectable} from '@angular/core';
import {PcInformation} from './pcinformation';
@Injectable({
  providedIn: 'root',
})
export class PcService {
  url = 'http://localhost:3000/locations';

  protected pcInformationList: PcInformation[] = [
 {
     "id": 0,
     "name": "LENOVO Yoga Slim 6 14",
     "colour": "Storm Grey",
     "cpu": "Intel® Core™ i5",
     "photo": "https://media.currys.biz/i/currysprod/10263573?$g-small$&fmt=auto",
     "memory": 8,
     "storage": 512
 },
 {
     "id": 1,
     "name": "HP Pavilion x360 14-ek1501sa 14",
     "colour": "Silver",
     "cpu": "Intel® Core™ i5",
     "photo": "https://media.currys.biz/i/currysprod/10251554?$g-small$&fmt=auto",
     "memory": 8,
     "storage": 256
 },
 {
     "id": 2,
     "name": "HP ENVY 17-da0503sa 17.3",
     "colour": "Glacier Silver",
     "cpu": "Intel® Core™ Ultra 5",
     "photo": "https://media.currys.biz/i/currysprod/10264268?$g-small$&fmt=auto",
     "memory": 16,
     "storage": 512
 },
 {
     "id": 3,
     "name": "LENOVO Yoga Slim 6 14",
     "colour": "Grey",
     "cpu": "Intel® Core™ i7",
     "photo": "https://media.currys.biz/i/currysprod/10259896?$g-small$&fmt=auto",
     "memory": 16,
     "storage": 512
 }
];

  getAllPcInformation(): PcInformation[] {
    return this.pcInformationList;
  }

  getPcInformationById(id: number): PcInformation | undefined {
    return this.pcInformationList.find((pcInformation) => pcInformation.id === id);
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Pc Stock Enquiry Received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
}
