import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// // import { AngularFireStorageModule } from '@angular/fire/storage';
// // import { AngularFireAuthModule } from '@angular/fire/auth';

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
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule // firestore
    // AngularFireAuthModule, // auth
    // AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
