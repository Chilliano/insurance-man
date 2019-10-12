import { Injectable } from '@angular/core';
import { ProductModel } from 'app/models/product.model';
import { BehaviorSubject } from 'rxjs';
import { InsuranceProducts } from 'app/services/products/InsuranceProducts.json';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public productsSource = new BehaviorSubject<ProductModel[]>([]);
  public products = this.productsSource.asObservable();

  private favouritesSource = new BehaviorSubject<ProductModel[]>([]);
  public favourites = this.favouritesSource.asObservable();

  constructor() {
    this.productsSource.next(InsuranceProducts);
  }


  

  // old 

  rootReducer(state, action) {
    switch (action.type) {
      case 'FAVOURITES_ADD':
        const newFavouritesState = state.concat(action.payload);
        this.favouritesSource.next(newFavouritesState);
        break;
      case 'FAVOURITES_REMOVE':
        // console.log('current state is ', state);
        const productsToRemove = action.payload;
        // console.log('current productsToRemove is ', productsToRemove);
        const updatedState = state;

        productsToRemove.forEach(f => {
          const exists = updatedState.indexOf(f) > -1;
          if (exists) {
            updatedState.splice(updatedState.indexOf(f), 1);
          }
        });
        // this.stateSource.next(updatedState);
        break;
      default:
        break;
    }
  }

  addFavourite = products => ({
    type: 'FAVOURITES_ADD',
    payload: products
  });

  removeFavourite = products => ({
    type: 'FAVOURITES_REMOVE',
    payload: products
  });

  addToFavourites(products: ProductModel[]) {
    const action = this.addFavourite(products);
    this.rootReducer(this.favouritesSource.getValue(), action);
  }

  removeFromFavourites(products: ProductModel[]) {
    const action = this.removeFavourite(products);
    this.rootReducer(this.favouritesSource.getValue(), action);
  }
}
