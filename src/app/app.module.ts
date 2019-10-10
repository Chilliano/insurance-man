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
import { ProductDataTableComponent } from 'app/components/tables/product-data-table/product-data-table.component';
import { TestTableComponent } from 'app/components/tables/test-table/test-table.component';
import { SelectModalComponent } from 'app/modals/select-modal/select-modal.component';
import { ListModalComponent } from 'app/modals/list-modal/list-modal.component';
import { HeaderComponent } from 'app/components/common/header/header.component';
import { FooterComponent } from 'app/components/common/footer/footer.component';
import { LogoComponent } from 'app/components/common/logo/logo.component';
import { SocialButtonComponent } from 'app/components/common/social-button/social-button.component';
import { TestTable3Component } from 'app/components/tables/test-table3/test-table3.component';
import { MiniListComponent } from './components/mini-list/mini-list.component';
import { InsuranceCardComponent } from './modals/insurance-card/insurance-card.component';

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
    ProductDataTableComponent,
    TestTableComponent,
    SelectModalComponent,
    ListModalComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    SocialButtonComponent,
    TestTable3Component,
    MiniListComponent,
    InsuranceCardComponent
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
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [SelectModalComponent, ListModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
