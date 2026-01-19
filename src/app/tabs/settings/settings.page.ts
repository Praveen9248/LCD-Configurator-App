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
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { person } from 'ionicons/icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonButton,
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
export class SettingsPage implements OnInit {
  constructor() {
    addIcons({ person });
  }

  ngOnInit() {}
}
