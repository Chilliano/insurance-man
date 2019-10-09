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
import { InsuranceProducts } from 'app/components/tables/test-table/InsuranceProducts.json.js';
import { SelectModalComponent } from 'app/modals/select-modal/select-modal.component';
import { ListModalComponent } from 'app/modals/list-modal/list-modal.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductModel } from 'app/models/product.model';
import { ProductsService } from 'app/services/products.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss']
})
export class TestTableComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  initialSelection = [];
  allowMultiSelect = true;

  selection = new SelectionModel<ProductModel>(true, []);

  nameFilter = new FormControl('');
  brandFilter = new FormControl('');
  kindFilter = new FormControl('');
  priceFilter = new FormControl('');

  dataSource = new MatTableDataSource<ProductModel>();

  columnHeaders = ['select', 'name', 'brand', 'kind', 'price'];
  filterValues = {
    name: '',
    brand: '',
    kind: '',
    price: ''
  };

  favourites: ProductModel[];
  favouritesSubscription: Subscription;

  displayMiniList = false;

  constructor(
    public dialog: MatDialog,
    private productsService: ProductsService
  ) {
    this.dataSource.data = [];
    this.favourites = [];
    this.setTableSelect();
    this.subscribeToFavourites();
  }

  ngOnInit() {
    this.subscribeToFilters();
  }

  ngAfterViewInit() {
    this.setDataSourceVariables();
  }

  onSaveSelected() {
    if (!this.selection.selected.length) {
      return;
    }
    const finalSelection = this.selection.selected.filter(
      s => this.favourites.indexOf(s) === -1
    );
    this.favourites = this.favourites.concat(finalSelection);
    this.productsService.addToFavourites(finalSelection);
  }

  onRemoveSelected() {
    console.log('implement logic here');
    // if (!this.selection.selected.length) {
    // return;
    // }
    // const finalSelection = this.selection.selected.filter(
    // s => this.favourites.indexOf(s) > -1
    // );
    // this.favourites = this.favourites.concat(finalSelection);
    // this.productsService.addToFavourites(finalSelection);
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
    // this.loading = true;
    this.dataSource.filter = JSON.stringify(this.filterValues);
    // this.loading = false;
  }

  toggleMiniList() {
    this.displayMiniList = !this.displayMiniList;
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

  openConfirmDialog(row, modal?): void {
    // if its not in the favourites
    if (this.favourites.indexOf(row) === -1) {
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
          // this.favourites.push(result);
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
  }

  openListDialog(): void {
    
    let dialogRef = this.dialog.open(ListModalComponent, {
      width: '250px',
      data: this.favourites
    });
    // dialogRef.componentInstance.openConfirmDialog = this.openConfirmDialog;
    // dialogRef.componentInstance.favourites = this.favourites;
    // dialogRef.componentInstance.selection.toggle = this.selection.toggle;

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
    });
  }

  subscribeToFavourites() {
    this.favouritesSubscription = this.productsService.favourites.subscribe(
      res => {
        console.log('res is ', res);
        this.favourites = res;
        console.log('this.favourites is ', this.favourites);
      }
    );
  }

  setDataSourceVariables() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = InsuranceProducts;
    this.dataSource.filterPredicate = this.createFilter();
  }

  // subscriptions
  subscribeToFilters() {
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

  setTableSelect() {
    this.selection = new SelectionModel<ProductModel>(
      this.allowMultiSelect,
      this.initialSelection
    );
  }
}
