// material.module.ts

import { NgModule } from '@angular/core';

import {
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatDialogModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatCardModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  exports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    MatCardModule
  ]
})
export class MaterialModule {}
