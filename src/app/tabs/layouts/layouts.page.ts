import { Component, computed, signal } from '@angular/core';
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
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, layers } from 'ionicons/icons';
import { Router } from '@angular/router';
import { LayoutContextService } from 'src/app/services/context/layout-context-service';
import { LanTransfer } from 'capacitor-lan-transfer';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.page.html',
  styleUrls: ['./layouts.page.scss'],
  standalone: true,
  imports: [
    IonButton,
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
export class LayoutsPage {
  constructor(
    private router: Router,
    private layoutContextService: LayoutContextService
  ) {
    addIcons({ layers, add });
  }

  status = signal<any>(null);

  existingLayouts = computed(() => this.layoutContextService.existingLayouts);

  onClickDetail(idx: any) {
    console.log(this.existingLayouts()[idx]);
  }

  onLayoutAdd() {
    this.router.navigate(['layout-setup']);
  }

  async shareConfig(id: any) {
    const currentFileUri = this.existingLayouts()[id]?.fileName;
    await LanTransfer.sendFile({ path: currentFileUri });

    await LanTransfer.addListener('status', (e) => {
      if (e.status === 'send_started') {
        this.status.set(e.status);
      }
      if (e.status === 'send_complete') {
        this.status.set(e.status);
      }
    });

    await LanTransfer.addListener('error', (e) => {
      this.status.set(e.message);
    });
  }
}
