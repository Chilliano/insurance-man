import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { InsuranceProducts } from 'app/components/test-table/InsuranceProducts.json.js';
import { SelectModalComponent } from 'app/modals/select-modal/select-modal.component';
import { ListModalComponent } from 'app/modals/list-modal/list-modal.component';

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss']
})
export class TestTableComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  products = InsuranceProducts;

  nameFilter = new FormControl('');
  brandFilter = new FormControl('');
  kindFilter = new FormControl('');
  priceFilter = new FormControl('');

  dataSource = new MatTableDataSource();

  columnsToDisplay = ['name', 'brand', 'kind', 'price'];
  filterValues = {
    name: '',
    brand: '',
    kind: '',
    price: ''
  };

  favourites = [];

  constructor(public dialog: MatDialog) {
    this.dataSource.data = this.products;
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnInit() {
    this.nameFilter.valueChanges.subscribe(name => {
      this.filterValues.name = name;
      // this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.brandFilter.valueChanges.subscribe(brand => {
      this.filterValues.brand = brand;
      // this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.kindFilter.valueChanges.subscribe(kind => {
      this.filterValues.kind = kind;
      // this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.priceFilter.valueChanges.subscribe(price => {
      this.filterValues.price = price;
      // this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onRowClicked(r) {
    console.log('row received', r);
    this.openConfirmDialog(r);
  }

  onDisplayList() {
    this.openSelectDialog();
  }

  onSearch() {
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return (
        data.name.toLowerCase().indexOf(searchTerms.name) !== -1 &&
        data.brand.toLowerCase().indexOf(searchTerms.brand) !== -1 &&
        data.kind.toLowerCase().indexOf(searchTerms.kind) !== -1 &&
        data.price
          .toString()
          .toLowerCase()
          .indexOf(searchTerms.price) !== -1
      );
    };
    return filterFunction;
  }

  openConfirmDialog(row): void {
    const dialogRef = this.dialog.open(SelectModalComponent, {
      width: '250px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.favourites.push(result);
    });
    console.log('this.favourites is ', this.favourites);
  }

  openSelectDialog(): void {
    const dialogRef = this.dialog.open(ListModalComponent, {
      width: '250px',
      data: this.favourites
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      console.log('results are ', result);
      // this.favourites.push(result);
    });
    console.log('this.favourites is ', this.favourites);
  }
}
