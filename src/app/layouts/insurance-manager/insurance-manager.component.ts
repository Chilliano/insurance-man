import { Component, OnInit, ViewChild } from '@angular/core';
import { InsuranceProducts } from './InsuranceProducts.json.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseApp, FirebaseDatabase } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
// import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
//   MatSortModule, MatTableModule } from "@angular/material";
// const firebase = require('firebase');
// Required for side-effects
// require('firebase/firestore');
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
  constructor(private db: AngularFirestore) {}
  displayedColumns: string[] = ['name', 'brand', 'price'];
  dataSource = new MatTableDataSource<Product>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
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
