import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-test-table3',
  templateUrl: './test-table3.component.html',
  styleUrls: ['./test-table3.component.scss']
})
export class TestTable3Component implements OnInit {
  nameFilter = new FormControl('');
  brandFilter = new FormControl('');
  kindFilter = new FormControl('');
  priceFilter = new FormControl('');
  constructor() { }

  ngOnInit() {
  }

}
