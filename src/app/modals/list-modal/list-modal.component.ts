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
@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListModalComponent implements OnInit {
  dataSource: ProductModel[] = [];
  favourites = [];
  selection: SelectionModel<ProductModel>;
  columnsToDisplay = [
    // 'select',
    'name',
    'brand',
    'kind'
  ];

  constructor(
    public dialogRef: MatDialogRef<ListModalComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel[]
  ) {
    this.favourites = data;
    this.dialog = dialog;
    // this.dataSource.filterPredicate = this.createFilter();
    // this.selection = new SelectionModel<ProductModel>(
    //   this.allowMultiSelect,
    //   this.initialSelection
    // );
  }

  ngOnInit() {
    console.log('d is ', this.data);
  }

  ngAfterViewInit() {
    this.dataSource = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openConfirmDialog(r) {
    console.log('r is ', r);
    this.dialogRef.componentInstance.openConfirmDialog(r);
  }
}
