import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "./service/auth.service";
import {Location} from '@angular/common';
import {interval} from "rxjs";

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
export class AppComponent implements OnInit {
  title = 'Myfoodiemap';
  isLoggedIn = this.authService.isLoggedIn();
  subscription;
  enabled: boolean;

  constructor(private authService: AuthService,
              public location: Location,
              private route: ActivatedRoute,
              private router: Router
  ) {
  }

  ngOnInit() {
    const url = this.location.path(true);
    if (url) {
      const params = new URLSearchParams(url.split('#')[1]);
      if (params.get('id_token')) {
        this.authService.authenticate(params.get('id_token'), params.get('access_token'), params.get('expires_in'));
        // Redirect to root after logged in
        if (this.authService.isLoggedIn()) {
          this.router.navigate(['/']);
        }
      }
    }

    this.subscription = interval(1000).subscribe(() => {
      if (!this.authService.isLoggedIn() && this.isLoggedIn) {
        this.logout();
      }
    });

    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    } else if (this.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
