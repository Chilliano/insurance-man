import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, filter } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

import {
  Observable,
  of as observableOf,
  merge,
  BehaviorSubject,
  SubscriptionLike
} from 'rxjs';
import { ProductModel } from 'app/models/product.model';
import { ProductsService } from 'app/services/products/products.service';
import { MatTableDataSource } from '@angular/material';
import { ProductsViews } from 'app/components/products-table/products-views';

export class ExampleTableDataSource extends MatTableDataSource<ProductModel> {
  _subscriptions: SubscriptionLike[] = [];

  data: ProductModel[] = [];
  favourites: ProductModel[] = [];

  paginator: MatPaginator;
  sort: MatSort;

  private searchFilter$ = new BehaviorSubject<string>(null);

  private loadingSource = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSource.asObservable();

  private isEmptySource = new BehaviorSubject<boolean>(true);
  public isEmpty$ = this.isEmptySource.asObservable();

  constructor(
    private productsService: ProductsService,
    private cdRef: ChangeDetectorRef,
    private currentView: ProductsViews
  ) {
    super();
  }

  init(): Observable<ProductModel[]> {
    this.setDataSubscriptions();

    const dataMutations = [
      this.data,
      this.paginator.page,
      this.sort.sortChange
    ];

    const res = merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
    console.log('filter here is ', this.filter);
    console.log('filterPredicate here is ', this.filterPredicate);
    console.log('filterData  here is ', this.filteredData);

    res.subscribe(products => {
      this.isEmptySource.next(products.length === 0);
      this.cdRef.detectChanges();
    });
    return res;
  }

  setDataSubscriptions() {
    this.currentView === ProductsViews.PRODUCTS
    ? this.productsService.products.subscribe(res => (this.data = res))
    : this.productsService.favourites.subscribe(res => (this.data = res)); 
    console.log('favourites in datasource are ', this.favourites);
  }

  disconnect() {
    this.loadingSource.complete();
    this.isEmptySource.complete();
    this.searchFilter$.complete();
  }

  private getPagedData(data: ProductModel[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: ProductModel[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'brand':
          return compare(a.brand, b.brand, isAsc);
        case 'kind':
          return compare(a.kind, b.kind, isAsc);
        case 'price':
          return compare(+a.price, +b.price, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
