import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatTableDataSource,
  MatDialog
} from '@angular/material';
import { ProductModel } from 'app/models/product.model';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductsService } from 'app/services/products.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.scss']
})
export class ListModalComponent implements OnInit {
  nameFilter = new FormControl('');
  companyFilter = new FormControl('');
  brandFilter = new FormControl('');
  kindFilter = new FormControl('');
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['name', 'brand', 'kind'];
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
    this.dataSource.filterPredicate = this.tableFilter();
  }

  tableFilter(): (data: any, filter: string) => boolean {
    // console.log('data is ', this.data);
    // console.log('filter is ', filter);

    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      console.log('data.name.toLowerCase() is ', data.name.toLowerCase());
      console.log(
        'does it exist in here ',
        data.name.toLowerCase().indexOf(searchTerms.name) !== -1
      );
      console.log('searchTerms.name is ', searchTerms.name);
      const res =
        data.name.toLowerCase().indexOf(searchTerms.name) !== -1 &&
        data.brand.toLowerCase().indexOf(searchTerms.brand) !== -1 &&
        data.kind.toLowerCase().indexOf(searchTerms.kind) !== -1 &&
        data.price
          .toString()
          .toLowerCase()
          .indexOf(searchTerms.price) !== -1;
      console.log('res is ', res);
      return (
        data.name.toLowerCase().indexOf(searchTerms.name) !== -1 &&
        data.brand.toLowerCase().indexOf(searchTerms.brand) !== -1 &&
        data.kind.toLowerCase().indexOf(searchTerms.kind) !== -1 
      );
    };
    return filterFunction;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openConfirmDialog(r) {
    this.dialogRef.componentInstance.openConfirmDialog(r);
    // this.subscribeToFavourites();
  }
}
