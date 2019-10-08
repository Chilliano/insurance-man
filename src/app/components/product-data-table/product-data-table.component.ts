import { Component, OnInit, ViewChild } from '@angular/core';
import { InsuranceProducts } from './InsuranceProducts.json';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ProductModel } from 'app/models/product.model';

@Component({
  selector: 'app-product-data-table',
  templateUrl: './product-data-table.component.html',
  styleUrls: ['./product-data-table.component.scss']
})
export class ProductDataTableComponent implements OnInit {
  displayedColumns = ['name', 'id', 'kind', 'brand', 'price'];
  dataSource = new MatTableDataSource<ProductModel>(InsuranceProducts);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor() {}

  ngOnInit() {
    console.log('this.dataSource is ', this.dataSource);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onRowClicked(row) {
    console.log('clicked ', row);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
