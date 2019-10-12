import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatTableDataSource,
  MatDialog,
  MatSort
} from '@angular/material';
import { ProductModel } from 'app/models/product.model';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductsService } from 'app/services/products/products.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { InsuranceCardComponent } from 'app/modals/insurance-card/insurance-card.component';
@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.scss']
})
export class ListModalComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  nameFilter = new FormControl('');
  companyFilter = new FormControl('');
  brandFilter = new FormControl('');
  kindFilter = new FormControl('');
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  filterValues = {
    name: '',
    brand: '',
    company: '',
    kind: ''
  };

  constructor(
    public dialogRef: MatDialogRef<ListModalComponent>,
    public dialog: MatDialog,
    private productsService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel[]
  ) {
    this.subscribeToFilters();
    this.dialog = dialog;
  }

  subscribeToFilters() {
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
  }

  ngOnInit() {}

  ngAfterViewInit() {
    console.log('data is ', this.data);
    this.dataSource.data = this.data;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.tableFilter();
  }

  tableFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      console.log('searchTerms.name is ', searchTerms.name);
      const res =
        data.name.toLowerCase().indexOf(searchTerms.name) !== -1 &&
        data.brand.toLowerCase().indexOf(searchTerms.brand) !== -1 &&
        data.kind.toLowerCase().indexOf(searchTerms.kind) !== -1 &&
        data.price
          .toString()
          .toLowerCase()
          .indexOf(searchTerms.price) !== -1;
      return (
        data.name.toLowerCase().indexOf(searchTerms.name) !== -1 &&
        data.brand.toLowerCase().indexOf(searchTerms.brand) !== -1 &&
        data.kind.toLowerCase().indexOf(searchTerms.kind) !== -1
      );
    };
    return filterFunction;
  }

  onRemoveSelected() {
    const productsToRemove = this.selection.selected;
    this.productsService.removeFromFavourites(productsToRemove);

    let updatedState = this.data;
    updatedState.forEach(f => {
      if (productsToRemove.indexOf(f) > -1) {
        updatedState.splice(updatedState.indexOf(f), 1);
      }
    });
    this.dataSource.data = updatedState;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isAllSelected() {
    const availablePaginatedRows = this.dataSource.connect().value;
    const numSelected = this.selection.selected.length;
    const numRows = availablePaginatedRows.length;
    return numSelected === numRows;
  }

  masterToggle() {
    const availablePaginatedRows = this.dataSource.connect().value;
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => {
          if (availablePaginatedRows.indexOf(row) > -1) {
            this.selection.select(row);
          }
        });
  }

  openInsuranceCardModal(row) {
    console.log('open insurance card modal here');
    // let dialogRef = this.dialog.open(InsuranceCardComponent, {
    //   width: '250px',
    //   data: row
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (!result) {
    //     return;
    //   }
    // });
  }

  logSelected() {
    console.log('selected is ', this.selection);
  }
}
