import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonSelect,
  IonSelectOption,
  IonButton,
  IonContent,
  IonItem,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-selection',
  templateUrl: './server-selection.page.html',
  styleUrls: ['./server-selection.page.scss'],
  standalone: true,
  imports: [
    IonItem,

    IonContent,
    IonButton,
    CommonModule,
    FormsModule,
    IonSelect,
    IonSelectOption,
  ],
})
export class ServerSelectionPage {
  constructor(private router: Router) {}

  onNext() {
    this.router.navigate(['login']);
  }
}
