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
import { MatDialog } from '@angular/material';
import { FavouritesModalComponent } from 'app/modals/favourites-modal/favourites-modal.component';
import { NotificationAlertsService } from 'app/services/notification-alerts/notification-alerts.service';
import { FilterModel } from 'app/models/filter.model';
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
  favourites: ProductModel[] = [];
  
  selection = new SelectionModel<ProductModel>(true, []);

  // filters
  filterControl = new FormControl('');

  filters: FilterModel[] = [
    { value: 'name', viewValue: 'Name' },
    { value: 'brand', viewValue: 'Brand' },
    { value: 'kind', viewValue: 'Kind' },
    { value: 'price', viewValue: 'Price' }
  ];

  selectedFilter: FilterModel[] = [{ value: 'name', viewValue: 'Name' }];


  constructor(
    private productsService: ProductsService,
    private cdRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private _notificationAlertsService: NotificationAlertsService
  ) {}

  ngOnInit() {
    this.dataSource = new ExampleTableDataSource(
      this.productsService,
      this.cdRef,
      this.productsViews
    );
    this.setColumns();
    this.setSubscriptions();
    this.setDataSourceFilter();
  }

  setSubscriptions() {
    this.productsService.favourites.subscribe(res => (this.favourites = res));
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  setDataSourceFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const searchValue = filter.trim().toLowerCase();
      const key = this.selectedFilter[0].value;
      const stringToCheck = data[key].trim().toLowerCase();
      const res = stringToCheck.includes(searchValue);
      return res;
    };
  }

  onFilterSelect(event) {
    this.selectedFilter = this.filters.filter(f => f.value === event.value);
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
    const selectedRows = this.selection.selected;

    if (!selectedRows.length) {
      return;
    }
    this.productsService.addToFavourites(selectedRows);

    const message =
      selectedRows.length === 1 ? 'Favourite added' : 'Favourites added';
    this._notificationAlertsService.successAlert(message);
  }

  onRemoveSelected() {
    const selectedRows = this.selection.selected;
    if (!selectedRows.length) {
      return;
    }
    this.productsService.removeFromFavourites(selectedRows);
    const message =
      selectedRows.length === 1 ? 'Favourite removed' : 'Favourites removed';
    this._notificationAlertsService.successAlert(message);
    selectedRows.forEach(r => this.selection.toggle(r));
  }

  onDisplayFavourites(): void {
    let dialogRef = this.dialog.open(FavouritesModalComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
    });
  }

  isListed(row) {
    const favs = this.favourites;
    const view = this.productsViews;
    return favs.indexOf(row) > -1 && view !== ProductsViews.FAVOURITES
      ? true
      : false;
  }

  retrieveImage(p) {
    return `../../assets/insuranceImages/${p['brand-image']}`;
  }
}
