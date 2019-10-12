import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService) {}
  imgNoData = environment.images.noData;

  ngOnInit() {}
}
