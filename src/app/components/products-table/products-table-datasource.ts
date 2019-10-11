import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import {
  Observable,
  of as observableOf,
  merge,
  BehaviorSubject,
  SubscriptionLike
} from 'rxjs';
import { ProductsService } from 'app/services/products/products.service';
import { ProductModel } from 'app/models/product.model';
import { InsuranceProducts } from '../tables/test-table/InsuranceProducts.json';

// TODO: Replace this with your own data model type

// TODO: replace this with real data from your application
const PRODUCT_DATA: ProductModel[] = InsuranceProducts;

/**
 * Data source for the ProductsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */

export class ProductsTableDataSource extends DataSource<ProductModel> {
  public data: ProductModel[] = PRODUCT_DATA;
  sort: MatSort;
  paginator: MatPaginator;
  private _subscriptions: SubscriptionLike[];
  private productsSource = new BehaviorSubject<ProductModel[]>([]);
  public products$ = this.productsSource.asObservable();

  _displayedColumns: string[] = [
    'select',
    'image',
    'name',
    'brand',
    'kind',
    'price'
  ];

  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  constructor(
    private productsService: ProductsService,
    public _paginator: MatPaginator,
    protected columns?: string[],
  ) {
    super();

    if (columns) {
      this._displayedColumns = columns;
    }
    this.paginator = _paginator;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ProductModel[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    console.log('this.paginator here is ', this.paginator);
    const dataMutations = [
      this.products$,
      // this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(
      map(() => {
        const res = this.getSortedData([...this.data]);
        // const res = this.getPagedData(this.getSortedData([...this.data]));
        console.log('response is ', res);
        return res;
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ProductModel[]) {
    console.log('paginator is ', this.paginator);
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ProductModel[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        // case 'id':
        //   return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
