import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  activeIcon = 'all';

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  switchIcon(icon) {
    this.activeIcon = icon;
  }

  search() {
    this.router.navigate(['/restaurants-list'], {queryParams: {category: this.activeIcon}});
  }
}
