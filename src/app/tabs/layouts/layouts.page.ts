import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonFab,
  IonFabButton,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, layers, shareSocial } from 'ionicons/icons';
import { Router } from '@angular/router';

import { LanTransferClientService } from 'src/app/services/context/lan-transfer-client-service';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { PreferenceService } from 'src/app/services/storage/preference-service';
import { LayoutContextService } from 'src/app/services/context/layout-context-service';

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
    IonList,
    IonContent,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonHeader,
    IonToolbar,
    IonTitle,
  ],
})
export class LayoutsPage {
  constructor(
    private router: Router,
    private lanTransferClientService: LanTransferClientService,
    private preferenceService: PreferenceService,
    private layoutContextService: LayoutContextService
  ) {
    addIcons({ layers, shareSocial, add });
  }

  ngOnInit() {
    this.lanTransferClientService.initOnce();
  }

  deviceStatus = computed(() =>
    this.lanTransferClientService.connectionStatus()
  );

  deviceLogs = computed(() => this.lanTransferClientService.logs());

  existingLayouts = computed(() => this.preferenceService.layouts());

  onClickDetail(idx: any) {
    const layout = this.existingLayouts()[idx];
    this.layoutContextService.setEditingFile(layout.name);
    this.readJsonFile(layout.name);
  }

  //not working in mobiles works fine with web
  async readJsonFile(location: string) {
    console.log(location);
    const result = await Filesystem.readFile({
      path: location,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });

    const jsonData = JSON.parse(result.data as string);
    this.layoutContextService.update(jsonData);
    this.router.navigate(['layout-setup']);
  }

  onLayoutAdd() {
    this.layoutContextService.resetContext();
    this.router.navigate(['layout-setup']);
  }

  async shareConfig(id: any, event: any) {
    event?.stopPropagation();
    const filePath = this.existingLayouts()[id]?.path;
    if (!filePath) return;

    await this.lanTransferClientService.sendFile(filePath);
  }
}
