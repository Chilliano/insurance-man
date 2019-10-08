export interface ProductModel {
  'Kind-image': 'kind_work.png';
  brand: 'Zurich';
  'brand-image': 'brand_zurich.png';
  id: '31';
  kind: 'Trabajo';
  name: 'Work sweet work';
  price: '120';
}

// displayedColumns = ['name', 'id', 'kind', 'brand', 'price'];

// <div class="mat-elevation-z8 data-table">
//   <table mat-table class="full-width-table" matSort aria-label="Elements">
//     <!-- Id Column -->
//     <ng-container matColumnDef="brand">
//       <th mat-header-cell *matHeaderCellDef mat-sort-header>brand</th>
//       <td mat-cell *matCellDef="let row">{{ row.brand }}</td>
//     </ng-container>

//     <!-- Name Column -->
//     <ng-container matColumnDef="name">
//       <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
//       <td mat-cell *matCellDef="let row">{{ row.name }}</td>
//     </ng-container>

//     <!-- Weight Column -->
//     <ng-container matColumnDef="price">
//       <th mat-header-cell *matHeaderCellDef>Price</th>
//       <td mat-cell *matCellDef="let element">{{ element.price }}</td>
//     </ng-container>

//     <!-- kind Column -->
//     <ng-container matColumnDef="kind">
//       <th mat-header-cell *matHeaderCellDef>kind</th>
//       <td mat-cell *matCellDef="let element">{{ element.kind }}</td>
//     </ng-container>

//     <ng-container matColumnDef="id">
//       <th mat-header-cell *matHeaderCellDef>id</th>
//       <td mat-cell *matCellDef="let element">{{ element.id }}</td>
//     </ng-container>

//     <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
//     <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
//   </table>

//   <mat-paginator
//     #paginator
//     [length]="dataSource?.data.length"
//     [pageIndex]="0"
//     [pageSize]="50"
//     [pageSizeOptions]="[25, 50, 100, 250]"
//   >
//   </mat-paginator>
// </div>


// styles
// .full-width-table {
//   width: 100%;
// }

// .data-table {
//   width:80%;
//   margin: 20px auto;
// }
