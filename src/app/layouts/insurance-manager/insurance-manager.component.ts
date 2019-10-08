import { Component, OnInit, ViewChild } from '@angular/core';
import { InsuranceProducts } from '../../components/data-table/InsuranceProducts.json.js';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'app-insurance-manager',
  templateUrl: './insurance-manager.component.html',
  styleUrls: ['./insurance-manager.component.scss']
})
export class InsuranceManagerComponent implements OnInit {
  constructor(private product: ProductsService) {}
  displayedColumns: string[] = ['name', 'brand', 'price', 'kind', 'id'];

  ngOnInit() {}

  // addProduct() {
  //   this.product.addProduct({
  //     name: '',
  //     brand: '',
  //     price: '',
  //     kind: '',
  //     id: ''
  //   });
  // }

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
}
