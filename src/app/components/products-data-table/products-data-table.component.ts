import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductsDataTableDataSource } from './products-data-table-datasource';
import { ProductModel } from 'app/models/product.model';
@Component({
  selector: 'app-products-data-table',
  templateUrl: './products-data-table.component.html',
  styleUrls: ['./products-data-table.component.scss']
})
export class ProductsDataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<ProductModel>;
  dataSource: ProductsDataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'id', 'kind', 'brand', 'price'];

  ngOnInit() {
    this.dataSource = new ProductsDataTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
