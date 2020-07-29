import {Component} from '@angular/core';

export interface PeriodicElement {
  id: string;
  name: string;
  rating: number;
  address: string;
  phone: string;
  website: string;
  category: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Myfoodiemap';
}
