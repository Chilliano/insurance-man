import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() name = '';
  @Input()
  control: FormControl;
  @Output() applyFilter = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
