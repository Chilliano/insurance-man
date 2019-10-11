import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';

// firebase modules -- reduce later
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material.module';

// layouts
import { HomeComponent } from 'app/layouts/home/home.component';
import { InsuranceManagerComponent } from 'app/layouts/insurance-manager/insurance-manager.component';
import { NoAccessComponent } from 'app/layouts/no-access/no-access.component';

// components
import { TestTableComponent } from 'app/components/tables/test-table/test-table.component';
import { SelectModalComponent } from 'app/modals/select-modal/select-modal.component';
import { ListModalComponent } from 'app/modals/list-modal/list-modal.component';
import { HeaderComponent } from 'app/components/common/header/header.component';
import { FooterComponent } from 'app/components/common/footer/footer.component';
import { LogoComponent } from 'app/components/common/logo/logo.component';
import { SocialButtonComponent } from 'app/components/common/social-button/social-button.component';
import { MiniListComponent } from './components/mini-list/mini-list.component';
import { InsuranceCardComponent } from './modals/insurance-card/insurance-card.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ExampleTableComponent } from './example-table/example-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// firebase app config
const config = {
  apiKey: 'AIzaSyBZf2I-_JyV79CpVGz_IWua5BjufJAKvMA',
  authDomain: 'insurance-man.firebaseapp.com',
  databaseURL: 'https://insurance-man.firebaseio.com',
  projectId: 'insurance-man',
  storageBucket: '',
  messagingSenderId: '243591381888',
  appId: '1:243591381888:web:01a65c4ff4a2fb7238b765',
  measurementId: 'G-M3J8YZN0B5'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InsuranceManagerComponent,
    NoAccessComponent,
    TestTableComponent,
    SelectModalComponent,
    ListModalComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    SocialButtonComponent,
    MiniListComponent,
    InsuranceCardComponent,
    ProductsTableComponent,
    ExampleTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  entryComponents: [SelectModalComponent, ListModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
