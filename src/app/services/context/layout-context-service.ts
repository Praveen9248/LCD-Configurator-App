import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutContextService {
  currentLayoutIdx = signal<any>(0);

  steps = [
    'TEMPLATE',
    'BUTTON',
    'BUTTON_CONFIG',
    'HEADER',
    'HEADER_CONFIG',
    'CONTENT',
    'SCREEN_SAVER',
    'INTERMEDIATE',
  ];

  outputConfig = signal<any>({});

  private stepLayoutForms = signal<Record<string, any>>({});

  setLayoutForm(stepKey: string, value: any) {
    this.stepLayoutForms.update((prev) => ({ ...prev, [stepKey]: value }));
  }

  getLayoutForm<T>(stepKey: string): T | null {
    return this.stepLayoutForms()[stepKey] ?? null;
  }

  goToNextStep() {
    if (this.currentLayoutIdx() < this.steps.length - 1) {
      this.currentLayoutIdx.update((i) => i + 1);
      return;
    }
    return;
  }

  goToPrevStep() {
    if (this.currentLayoutIdx() > 0) {
      this.currentLayoutIdx.update((i) => i - 1);
      console.log(this.currentLayoutIdx());
      return;
    }
    return;
  }
}
