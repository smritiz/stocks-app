import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  hide = false;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    router.events.subscribe( val => {
      if (val instanceof NavigationEnd) {
        if (val.url.includes('/login') || val.url.includes('/signup')) {
          this.hide = true;
        } else {
          this.hide = false;
        }
      }
    });
  }

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }

}
