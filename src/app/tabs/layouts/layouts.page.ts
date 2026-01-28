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
import { LanTransferClientService } from 'src/app/services/context/lan-transfer-client-service';

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
    private layoutContextService: LayoutContextService,
    private lanTransferClientService: LanTransferClientService
  ) {
    addIcons({ layers, add });
  }

  deviceStatus = computed(() =>
    this.lanTransferClientService.connectionStatus()
  );

  deviceLogs = computed(() => this.lanTransferClientService.logs());

  existingLayouts = computed(() => this.layoutContextService.ExistingLayouts());

  onClickDetail(idx: any) {
    console.log(this.existingLayouts()[idx]);
  }

  onLayoutAdd() {
    this.router.navigate(['layout-setup']);
  }

  async shareConfig(id: any) {
    const filePath = this.existingLayouts()[id]?.fileName;
    if (!filePath) return;

    await this.lanTransferClientService.sendFile(filePath);
  }
}
