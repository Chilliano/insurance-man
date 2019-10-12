import { Component, OnInit } from '@angular/core';
import { ProductsViews } from 'app/components/products-table/products-views';

@Component({
  selector: 'app-favourites-modal',
  templateUrl: './favourites-modal.component.html',
  styleUrls: ['./favourites-modal.component.scss']
})
export class FavouritesModalComponent implements OnInit {
  productsView = ProductsViews.FAVOURITES;

  constructor() { }

  ngOnInit() {

  }

}
