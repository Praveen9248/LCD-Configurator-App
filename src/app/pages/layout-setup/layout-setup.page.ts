import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonButton,
  IonHeader,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { LayoutContextService } from 'src/app/services/context/layout-context-service';

@Component({
  selector: 'app-layout-setup',
  templateUrl: './layout-setup.page.html',
  styleUrls: ['./layout-setup.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonButton,
    IonFooter,
    IonContent,

    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class LayoutSetupPage implements OnInit {
  constructor(
    private router: Router,
    private layoutContextService: LayoutContextService
  ) {}

  ngOnInit() {}
}
