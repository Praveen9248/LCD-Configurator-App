import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonList,
  IonText,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonToggle,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { person, notificationsOutline, moonOutline, shieldCheckmarkOutline } from 'ionicons/icons';

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
    IonList,
    IonContent,
    CommonModule,
    FormsModule,
    IonAvatar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonToggle,
    IonHeader,
    IonToolbar,
    IonTitle,

  ],
})
export class SettingsPage implements OnInit {
  constructor() {
    addIcons({ person, notificationsOutline, moonOutline, shieldCheckmarkOutline });
  }

  ngOnInit() { }
}
