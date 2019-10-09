import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private afs: AngularFirestore) {}

  // addProduct(productData) {
  //   this.afs
  //     .collection('products')
  //     .add(productData)
  //     .then(() => {
  //       console.log('Done');
  //     });
  // }

  // getProducts() {
    // const result = this.afs
      // .collection('products', ref => ref.orderBy('name'))
      // .valueChanges();  
    // return result;
  // }
}
