import { Injectable, signal } from '@angular/core';

export interface SetupContext {
  templateType?: 'list' | 'nested';
  button?: any;
  header?: any;
  content?: any;
  screenSaver?: any;
  intermediate?: any;
}

@Injectable({ providedIn: 'root' })
export class LayoutContextService {
  private layoutContext = signal<SetupContext>({});
  private ExistingLayouts = signal<any>([]);

  existingDevices = signal<any>([]);

  currentStepIdx = signal(0);

  steps = [
    'TEMPLATE',
    'BUTTON',
    'HEADER',
    'CONTENT',
    'SCREEN_SAVER',
    'INTERMEDIATE',
  ];

  get value() {
    return this.layoutContext();
  }

  get existingLayouts() {
    return this.ExistingLayouts();
  }

  updateLayoutsList(data: any) {
    this.ExistingLayouts.update((prev) => [...prev, data]);
  }

  update(partial: Partial<SetupContext>) {
    this.layoutContext.update((current) => ({ ...current, ...partial }));
  }

  resetContext() {
    this.layoutContext.set({});
  }
}
