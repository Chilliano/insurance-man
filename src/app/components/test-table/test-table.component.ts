import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatCheckbox,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { InsuranceProducts } from 'app/components/test-table/InsuranceProducts.json.js';
import { SelectModalComponent } from 'app/modals/select-modal/select-modal.component';
import { ListModalComponent } from 'app/modals/list-modal/list-modal.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductModel } from 'app/models/product.model';
import { ProductsService } from 'app/services/products.service';
@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss']
})
export class TestTableComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  products = InsuranceProducts;
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<ProductModel>(true, []);

  nameFilter = new FormControl('');
  brandFilter = new FormControl('');
  kindFilter = new FormControl('');
  priceFilter = new FormControl('');

  dataSource = new MatTableDataSource<ProductModel>();

  columnsToDisplay = ['select', 'name', 'brand', 'kind', 'price'];
  filterValues = {
    name: '',
    brand: '',
    kind: '',
    price: ''
  };

  favourites = [];

  loading = false;

  constructor(
    public dialog: MatDialog,
    private productsService: ProductsService
  ) {
    this.dataSource.data = [];
    this.dataSource.filterPredicate = this.createFilter();
    this.selection = new SelectionModel<ProductModel>(
      this.allowMultiSelect,
      this.initialSelection
    );
  }

  ngOnInit() {
    this.loading = true;
    this.nameFilter.valueChanges.subscribe(name => {
      this.filterValues.name = name;
    });
    this.brandFilter.valueChanges.subscribe(brand => {
      this.filterValues.brand = brand;
    });
    this.kindFilter.valueChanges.subscribe(kind => {
      this.filterValues.kind = kind;
    });
    this.priceFilter.valueChanges.subscribe(price => {
      this.filterValues.price = price;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // simulate api fetch
    setTimeout(() => {
      this.dataSource.data = this.products;
      this.loading = false;
    }, 500);
  }

  onSaveSelected() {
    const finalSelection = this.selection.selected.filter(
      s => this.favourites.indexOf(s) === -1
    );
    this.favourites = this.favourites.concat(finalSelection);
    this.productsService.addToFavourites(finalSelection);

    console.log('new favourites is ', this.favourites);
  }

  onRowClicked(r) {
    this.openConfirmDialog(r);
  }

  onDisplayList() {
    this.openListDialog();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const availablePaginatedRows = this.dataSource.connect().value;
    const numSelected = this.selection.selected.length;
    const numRows = availablePaginatedRows.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
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

  onSearch() {
    // simulate api fetch
    this.loading = true;
    setTimeout(() => {
      this.dataSource.filter = JSON.stringify(this.filterValues);
      this.loading = false;
    }, 500);
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
    console.log('inside test-table i get ', row);
    // if its not in the favourites
    if (this.favourites.indexOf(row) === -1) {
      console.log('row is ', row);
      const dialogRef = this.dialog.open(SelectModalComponent, {
        width: '250px',
        data: row
      });
      dialogRef.afterClosed().subscribe(result => {
        // if they dont want to save it in the list
        if (!result) {
          return;
          // if they want to save it in the list
        } else {
          this.productsService.addToFavourites([result]);
          this.favourites.push(result);
          this.selection.isSelected(row);
          this.selection.toggle(row);
        }
      });
    }
    // if its in the favourites
    else {
      const data = row;
      data.previouslySelected = true;
      const dialogRef = this.dialog.open(SelectModalComponent, {
        width: '250px',
        data
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.productsService.removeFromFavourites([row]);
          this.favourites = this.favourites.filter(r => r.id !== row.id);
          this.selection.toggle(row);
        } else {
          return;
        }
      });
    }
    console.log('this.favourites is ', this.favourites);
  }

  openListDialog(): void {
    let dialogRef = this.dialog.open(ListModalComponent, {
      width: '250px',
      data: this.favourites
    });
    dialogRef.componentInstance.openConfirmDialog = this.openConfirmDialog;
    dialogRef.componentInstance.favourites = this.favourites;
    dialogRef.componentInstance.selection = this.selection;

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      console.log('results are ', result);
    });
    console.log('this.favourites is ', this.favourites);
  }
}
