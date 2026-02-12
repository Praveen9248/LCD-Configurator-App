import { Injectable, signal } from '@angular/core';

export interface SetupContext {
  template?: any;
  button?: any;
  header?: any;
  images?: any;
  content?: any;
  screenSaver?: any;
  intermediate?: any;
  result?: any;
  flow?: any;
}

@Injectable({ providedIn: 'root' })
export class LayoutContextService {
  private layoutContext = signal<SetupContext>({});
  ExistingLayouts = signal<any[]>([]);
  editingFile = signal<any>(null);

  currentStepIdx = signal(0);

  steps = [
    'TEMPLATE',
    'BUTTON',
    'HEADER',
    'IMAGE',
    'CONTENT',
    'SCREEN_SAVER',
    'INTERMEDIATE',
    'RESULT',
  ];

  readonly value = this.layoutContext.asReadonly();

  updateLayoutsList(data: any) {
    this.ExistingLayouts.update((prev) => [...prev, data]);
  }

  update(partial: Partial<SetupContext>) {
    this.layoutContext.update((current) => ({ ...current, ...partial }));
    console.log(this.layoutContext());
  }

  setEditingFile(name: any) {
    this.editingFile.set(name);
  }

  clearEditingFile() {
    this.editingFile.set(null);
  }

  resetContext() {
    this.layoutContext.set({});
    this.clearEditingFile();
  }
}
