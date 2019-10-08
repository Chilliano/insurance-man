import { Component, OnInit, ViewChild } from '@angular/core';
import { InsuranceProducts } from './InsuranceProducts.json.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseApp, FirebaseDatabase } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataSource } from '@angular/cdk/collections';
import { ProductsService } from 'app/services/products.service';
export interface Product {
  id: string;
  name: string;
  brand: string;
  kind: string;
  price: string;
}

const ELEMENT_DATA: Product[] = InsuranceProducts;
@Component({
  selector: 'app-insurance-manager',
  templateUrl: './insurance-manager.component.html',
  styleUrls: ['./insurance-manager.component.scss']
})
export class InsuranceManagerComponent implements OnInit {
  constructor(
    private product: ProductsService,
    private afs: AngularFirestore
  ) {}
  displayedColumns: string[] = ['name', 'brand', 'price', 'kind', 'id'];
  dataSource = new MatTableDataSource<Product>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  // addOne() {
  //   console.log('inside');
  //   const productRef = this.afs.collection('products');
  //   productRef
  //     .add({ name: 'test' })
  //     .then(function(docRef) {
  //       console.log('Document written with ID: ', docRef.id);
  //     })
  //     .catch(function(error) {
  //       console.error('Error adding document: ', error);
  //     });
  // }
  addProduct() {
    this.product.addProduct({
      name: '',
      brand: '',
      price: '',
      kind: '',
      id: ''
    });
  }
  getProducts() {
    return this.afs
      .collection('products', ref => ref.orderBy('name'))
      .valueChanges();
  }

  // uploadAllDocs() {
  //   console.log('upload all docs with db ', this.db);
  //   const productRef = this.db.collection('products');

  //   ELEMENT_DATA.forEach(product => {
  //     productRef
  //       .add(product)
  //       .then(function(docRef) {
  //         console.log('Document written with ID: ', docRef.id);
  //       })
  //       .catch(function(error) {
  //         console.error('Error adding document: ', error);
  //       });
  //   });
  // }
}
