import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  @Input() word1 = '';
  @Input() word2 = '';
  @Input() fontSize = 0;
  constructor() {}

  ngOnInit() {}
}
