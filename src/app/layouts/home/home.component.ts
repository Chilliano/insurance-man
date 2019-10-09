import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  spinNow = false;
  displayNow = false;
  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.spinNow = true;
  }
}
