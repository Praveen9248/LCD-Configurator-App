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

  update(partial: Partial<SetupContext>) {
    this.layoutContext.update((current) => ({ ...current, ...partial }));
    console.log(this.layoutContext());
  }
}
