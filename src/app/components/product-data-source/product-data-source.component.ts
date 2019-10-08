import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'app/services/products.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-product-data-source',
  templateUrl: './product-data-source.component.html',
  styleUrls: ['./product-data-source.component.scss']
})
export class ProductDataSourceComponent extends DataSource<any> {
  constructor(private product: ProductsService) {
    super();
  }

  connect() {
    return this.product.getProducts();
  }

  disconnect() {}
}
