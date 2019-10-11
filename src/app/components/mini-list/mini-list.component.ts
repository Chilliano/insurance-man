import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from 'app/models/product.model';
import { ProductsService } from 'app/services/products/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mini-list',
  templateUrl: './mini-list.component.html',
  styleUrls: ['./mini-list.component.scss']
})
export class MiniListComponent implements OnInit {
  favourites: ProductModel[];
  favouritesSubscription: Subscription;
  constructor(private productsService: ProductsService) {
    this.subscribeToFavourites();
  }

  ngOnInit() {}

  subscribeToFavourites() {
    this.favouritesSubscription = this.productsService.favourites.subscribe(
      res => {
        this.favourites = res;
      }
    );
  }
}
