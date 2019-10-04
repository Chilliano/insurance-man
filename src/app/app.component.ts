import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'insurance-man';
  constructor(private db: AngularFirestore) {
    const alerts = db.collection('alerts').valueChanges();
    alerts.subscribe(console.log);
  }
}
