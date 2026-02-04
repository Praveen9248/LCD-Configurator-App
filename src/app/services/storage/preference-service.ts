import { inject, Injectable, signal } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { LayoutContextService } from '../context/layout-context-service';

@Injectable({
  providedIn: 'root',
})
export class PreferenceService {
  layouts = signal<any[]>([]);
  layoutContextService = inject(LayoutContextService);

  constructor() {
    this.loadLayouts();
  }

  async loadLayouts() {
    const layouts = await Preferences.get({ key: "layouts" });
    if (layouts.value) {
      this.layouts.set(JSON.parse(layouts.value));
      if (this.layouts().length) {
        this.layoutContextService.updateLayoutsList(this.layouts());
      }
    }
  }

  async addLayout(layout: any) {
    this.layouts.update((l) => [...l, layout]);
    await Preferences.set({ key: "layouts", value: JSON.stringify(this.layouts()) });
  }
}
