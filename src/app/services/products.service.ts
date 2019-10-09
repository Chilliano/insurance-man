import { Injectable } from '@angular/core';
import { ProductModel } from 'app/models/product.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private stateSource = new BehaviorSubject<any>([]);
  stateO = this.stateSource.asObservable();

  constructor() {}

  get favourites() {
    return this.stateO;
  }

  rootReducer(state, action) {
    switch (action.type) {
      case 'FAVOURITES_ADD':
        const newFavouritesState = state.concat(action.payload);
        this.stateSource.next(newFavouritesState);
        console.log('now the state is ', this.stateSource.getValue());
        break;
      case 'FAVOURITES_REMOVE':
        const productsToRemove = action.payload;
        let updatedState = state;
        updatedState.forEach(f => {
          if (productsToRemove.indexOf(f) === -1) {
            return;
          } else if (productsToRemove.indexOf(f) > -1) {
            updatedState.splice(updatedState.indexOf(f), 1);
          }
        });
        this.stateSource.next(updatedState);
        console.log('now the state is ', this.stateSource.getValue());
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
    this.rootReducer(this.stateSource.getValue(), action);
  }

  removeFromFavourites(products: ProductModel[]) {
    const action = this.removeFavourite(products);
    this.rootReducer(this.stateSource.getValue(), action);
  }
}
