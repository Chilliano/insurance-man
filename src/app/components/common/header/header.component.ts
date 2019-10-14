import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  imgNoData = environment.images.noData;
  currentRoute;
  constructor(public auth: AuthService, private router: Router) {
    router.events.subscribe(res => (this.currentRoute = res));
    console.log('currentRoute is ', this.currentRoute);
  }

  ngOnInit() {}
}
