import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonList,
  IonListHeader,
  IonText,
  IonItem,
  IonIcon,
  IonLabel,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, layers } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.page.html',
  styleUrls: ['./layouts.page.scss'],
  standalone: true,
  imports: [
    IonFabButton,
    IonFab,
    IonLabel,
    IonIcon,
    IonItem,
    IonText,
    IonListHeader,
    IonList,
    IonContent,
    CommonModule,
    FormsModule,
  ],
})
export class LayoutsPage implements OnInit {
  constructor(private router: Router) {
    addIcons({ layers, add });
  }

  ngOnInit() {}

  onLayoutAdd() {
    this.router.navigate(['layout-setup']);
  }
}
