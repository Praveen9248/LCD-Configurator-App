import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  private ctx$ = new BehaviorSubject<SetupContext>({});

  get value() {
    return this.ctx$.value;
  }

  update(partial: Partial<SetupContext>) {
    console.log(partial);

    this.ctx$.next({
      ...this.ctx$.value,
      ...partial,
    });
  }
}
