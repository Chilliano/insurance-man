import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Input
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductsTableDataSource } from './products-table-datasource';
import { ProductsViews } from './products-views';
import { ProductModel } from 'app/models/product.model';
import { SubscriptionLike } from 'rxjs';

import { ProductsService } from 'app/services/products/products.service';
@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<ProductModel>;

  @Input() productsViews: ProductsViews = ProductsViews.PRODUCTS;

  dataSource: ProductsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  // displayedColumns = ['id', 'name'];

  selectedProduct: ProductModel;

  private _subscriptions: SubscriptionLike[];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    let displayedColumns: string[];

    switch (this.productsViews) {
      // case ExpensesViews.MY_EXPENSES:
      //   displayedColumns = [
      //     'expenseNumber',
      //     'purpose',
      //     'project',
      //     'createdAt',
      //     'processedBy',
      //     'status',
      //     'remove'
      //   ];
      //   break;
      // case ExpensesViews.TEAM:
      // case ExpensesViews.PENDING_APPROVAL:
      // case ExpensesViews.IN_PROCESS:
      //   displayedColumns = [
      //     'expenseNumber',
      //     'creator',
      //     'purpose',
      //     'project',
      //     'createdAt',
      //     'processedBy',
      //     'status'
      //   ];
      //   break;
      default:
        displayedColumns = [
          'select',
          'image',
          'name',
          'brand',
          'kind',
          'price'
        ];
        break;
    }

    this.dataSource = new ProductsTableDataSource(
      this.productsService,
      this.paginator,
      displayedColumns,
    );

    this._subscriptions = [];
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.table.dataSource = this.dataSource;
    console.log('this.datasource is ', this.dataSource);
    console.log('this.paginator is ', this.paginator);

  }

  ngOnDestroy() {
    this.dataSource.disconnect();
  }
}
