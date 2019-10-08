import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductModel } from 'app/models/product.model';

@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.scss']
})
export class ListModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ListModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel[]
  ) { }

  ngOnInit() {
    console.log('d is ', this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

