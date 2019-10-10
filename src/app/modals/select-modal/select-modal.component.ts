import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductModel } from 'app/models/product.model';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss']
})
export class SelectModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SelectModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log('data is ', this.data);
  }

  retrieveImage() {
    return `../../../assets/insuranceImages/${this.data['brand-image']}`;
  }
}
