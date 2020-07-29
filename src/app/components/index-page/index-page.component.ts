import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})

// Interface - type of entity that describes methods but don't realize it;
// OnInit - special Angular Interface that allows use ngOnInit method;
// implements - special keyword that obliges component realize interfaces`s methods;
// export - special keyword that allows this component to be visible and available for import in other components

export class IndexPageComponent implements OnInit {
  // activeIcon property set type of UI icon. 'All' is set by default
  activeIcon = 'all';
  // Constructor should call first
  constructor(private router: Router) {}
  // Method should call straight after initialization of IndexPage component
  ngOnInit(): void {
  }
  // switchIcon method changes state of this.activeIcon property that allows UI icons change 'active' class
  switchIcon(icon) {
    this.activeIcon = icon;
  }
  // search method calls when user click on search button. It redirect user to /restaurant-list page and passes parameters
  search() {
    this.router.navigate(['/restaurants-list'], {queryParams: {category: this.activeIcon}});
  }
}
