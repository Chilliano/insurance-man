import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeComponent } from './layouts/home/home.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { InsuranceManagerComponent } from './layouts/insurance-manager/insurance-manager.component';
import { NoAccessComponent } from './layouts/no-access/no-access.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule } from "@angular/material";

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
  declarations: [AppComponent, HomeComponent, InsuranceManagerComponent, NoAccessComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule, // firestore
    // AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
