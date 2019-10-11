import { Component, OnInit } from '@angular/core';
// import { ProductsService } from 'app/services/products.service';
import { AuthService } from 'app/services/auth.service';
import { ProductsViews } from 'app/components/products-table/products-views';

@Component({
  selector: 'app-insurance-manager',
  templateUrl: './insurance-manager.component.html',
  styleUrls: ['./insurance-manager.component.scss']
})
export class InsuranceManagerComponent implements OnInit {
  productsView = ProductsViews.PRODUCTS;

  constructor(public auth: AuthService) // private product: ProductsService
  {}

  ngOnInit() {
    // console.log('this.auth is ', this.auth.user$);
  }

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
