import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonList,
  IonListHeader,
  IonText,
  IonIcon,
  IonLabel,
  IonFabButton,
  IonFab,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, desktop } from 'ionicons/icons';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
  standalone: true,
  imports: [
    IonFab,
    IonFabButton,
    IonLabel,
    IonIcon,
    IonText,
    IonListHeader,
    IonItem,
    IonContent,

    CommonModule,
    FormsModule,
    IonList,
  ],
})
export class DevicesPage implements OnInit {
  constructor() {
    addIcons({ desktop, add });
  }

  ngOnInit() {}
}
