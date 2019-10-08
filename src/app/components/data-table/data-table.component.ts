import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductDataSourceComponent } from 'app/components/product-data-source/product-data-source.component';
import { ProductsService } from 'app/services/products.service';

export interface Product {
  id: string;
  name: string;
  brand: string;
  kind: string;
  price: string;
}
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'brand', 'price', 'kind', 'id'];
  dataSource = new ProductDataSourceComponent(this.product);
  constructor(
    private product: ProductsService,
    private afs: AngularFirestore // private db: AngularFirestore
  ) {}

  // // const alerts = db.collection('alerts').valueChanges();
  // alerts.subscribe(console.log);

  ngOnInit() {}
}
