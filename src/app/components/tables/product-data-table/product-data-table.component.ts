import { Component, OnInit, ViewChild } from '@angular/core';
import { InsuranceProducts } from '../test-table/InsuranceProducts.json.js';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ProductModel } from 'app/models/product.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-data-table',
  templateUrl: './product-data-table.component.html',
  styleUrls: ['./product-data-table.component.scss']
})
export class ProductDataTableComponent implements OnInit {
  displayedColumns = ['name', 'brand', 'kind', 'price'];
  // @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: false }) sort: MatSort;

  nameFilter = new FormControl('');
  brandFilter = new FormControl('');
  kindFilter = new FormControl('');
  priceFilter = new FormControl('');

  filterValues = { name: '', brand: '', kind: '', price: '' };

  dataSource = new MatTableDataSource();
  constructor() {
    this.dataSource = new MatTableDataSource<ProductModel>(InsuranceProducts);
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnInit() {
    this.setupSubscriptions();
  }

  ngAfterViewInit() {
    this.dataSource.filterPredicate = this.tableFilter();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  tableFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return (
        data.name.toLowerCase().indexOf(searchTerms.name) !== -1 &&
        data.price
          .toString()
          .toLowerCase()
          .indexOf(searchTerms.price) !== -1 &&
        data.brand.toLowerCase().indexOf(searchTerms.colour) !== -1 &&
        data.kind.toLowerCase().indexOf(searchTerms.pet) !== -1
      );
    };
    return filterFunction;
  }

  setupSubscriptions() {
    this.nameFilter.valueChanges.subscribe(name => {
      this.filterValues.name = name;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.brandFilter.valueChanges.subscribe(brand => {
      this.filterValues.brand = brand;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.kindFilter.valueChanges.subscribe(kind => {
      this.filterValues.kind = kind;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.priceFilter.valueChanges.subscribe(price => {
      this.filterValues.price = price;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  onRowClicked(row) {
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return (
        data.name.toLowerCase().indexOf(searchTerms.name) !== -1 &&
        data.id
          .toString()
          .toLowerCase()
          .indexOf(searchTerms.id) !== -1 &&
        data.colour.toLowerCase().indexOf(searchTerms.colour) !== -1 &&
        data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1
      );
    };
    return filterFunction;
  }
}
