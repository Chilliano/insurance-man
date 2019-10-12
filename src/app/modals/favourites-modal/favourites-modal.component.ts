import { Component, OnInit } from '@angular/core';
import { ProductsViews } from 'app/components/products-table/products-views';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-favourites-modal',
  templateUrl: './favourites-modal.component.html',
  styleUrls: ['./favourites-modal.component.scss']
})
export class FavouritesModalComponent implements OnInit {
  productsView = ProductsViews.FAVOURITES;

  constructor(
    public dialogRef: MatDialogRef<FavouritesModalComponent>,
    public dialog: MatDialog
  ) {
    this.dialog = dialog;
  }

  ngOnInit() {}

  onCancel() {
    this.dialogRef.close();
  }
}
