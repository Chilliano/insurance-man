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
import { ExampleTableDataSource } from './example-table-datasource';
import { ProductsViews } from 'app/components/products-table/products-views';
import { ProductModel } from 'app/models/product.model';
import { ProductsService } from 'app/services/products/products.service';
import { environment } from '../../environments/environment';
import { FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-example-table',
  templateUrl: './example-table.component.html',
  styleUrls: ['./example-table.component.scss']
})
export class ExampleTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<ProductModel>;

  @Input() productsViews: ProductsViews = ProductsViews.PRODUCTS;

  imgNoData = environment.images.noData;
  dataSource: ExampleTableDataSource;

  displayedColumns = [];

  // filters
  nameFilter = new FormControl('');
  brandFilter = new FormControl('');
  kindFilter = new FormControl('');
  priceFilter = new FormControl('');
  filterValues = {
    name: '',
    brand: '',
    kind: '',
    price: ''
  };

  selection = new SelectionModel<ProductModel>(true, []);

  constructor(
    private productsService: ProductsService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dataSource = new ExampleTableDataSource(
      this.productsService,
      this.cdRef
    );
    this.setColumns();
  }

  setColumns() {
    let displayedColumns: string[];

    switch (this.productsViews) {
      case ProductsViews.FAVOURITES:
        displayedColumns = ['select', 'image', 'name', 'brand', 'kind'];
        break;
      case ProductsViews.PRODUCTS:
        displayedColumns = [
          'select',
          'image',
          'name',
          'brand',
          'kind',
          'price'
        ];
        break;
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
    this.displayedColumns = displayedColumns;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.init();
  }

  retrieveImage(p) {
    return `../../assets/insuranceImages/${p['brand-image']}`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  onSaveSelected() {
    if (!this.selection.selected.length) {
      return;
    }
    const finalSelection = this.selection.selected.filter(
      s => this.dataSource.favourites.indexOf(s) === -1
    );
    this.dataSource.favourites = this.dataSource.favourites.concat(
      finalSelection
    );
    this.productsService.addToFavourites(finalSelection);

    // log results to keep check
    console.log('datasource favs now at ', this.dataSource.favourites);
    this.productsService.favourites.subscribe(res =>
      console.log('res is ', res)
    );
  }

  onRemoveSelected() {
    const productsToRemove = this.selection.selected;
    this.productsService.removeFromFavourites(productsToRemove);
    console.log('datasource favs now at ', this.dataSource.favourites);
    this.productsService.favourites.subscribe(res =>
      console.log('res is ', res)
    );
  }

  // onDisplayFavourites(): void {
  //   let dialogRef = this.dialog.open(ListModalComponent, {
  //     width: '250px',
  //     data: this.favourites
  //   });
  //   // dialogRef.componentInstance.openConfirmDialog = this.openConfirmDialog;
  //   // dialogRef.componentInstance.favourites = this.favourites;
  //   dialogRef.componentInstance.selection.toggle = this.selection.toggle;

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (!result) {
  //       return;
  //     }
  //   });
  // }
}
