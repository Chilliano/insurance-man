import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ProductModel } from 'app/models/product.model';

@Component({
  selector: 'app-insurance-card',
  templateUrl: './insurance-card.component.html',
  styleUrls: ['./insurance-card.component.scss']
})
export class InsuranceCardComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InsuranceCardComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel[]
  ) {}

  ngOnInit() {}
}
