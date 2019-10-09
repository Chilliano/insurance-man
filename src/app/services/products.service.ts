import { Injectable } from '@angular/core';
import { ProductModel } from 'app/models/product.model';
@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  state = { favourites: [] };

  // reducer
  rootReducer(state, action) {
    let oldFavouritesState = state;
    switch (action.type) {
      case 'FAVOURITES_ADD':
        const newFavouritesState = oldFavouritesState.concat(action.payload);
        this.state.favourites = newFavouritesState;
        break;
      case 'FAVOURITES_REMOVE':
        const productsToRemove = action.payload;
        let updatedState = oldFavouritesState;
        updatedState.forEach(f => {
          if (productsToRemove.indexOf(f) === -1) {
            return;
          } else if (productsToRemove.indexOf(f) > -1) {
            updatedState.splice(updatedState.indexOf(f), 1);
          }
        });
        this.state.favourites = updatedState;
        break;
      default:
        break;
    }
  }

  // actions
  addFavourite = products => ({
    type: 'FAVOURITES_ADD',
    payload: products
  });

  removeFavourite = products => ({
    type: 'FAVOURITES_REMOVE',
    payload: products
  });

  constructor() {}

  // actions

  addToFavourites(products: ProductModel[]) {
    const action = this.addFavourite(products);
    this.rootReducer(this.state.favourites, action);
  }

  removeFromFavourites(products: ProductModel[]) {
    const action = this.removeFavourite(products);
    this.rootReducer(this.state.favourites, action);
  }
}
