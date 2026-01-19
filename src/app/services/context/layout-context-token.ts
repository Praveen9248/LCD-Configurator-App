import { InjectionToken } from '@angular/core';
import { LayoutContextService } from './layout-context-service';

export const LAYOUT_CONTEXT = new InjectionToken<LayoutContextService>(
  'LAYOUT_CONTEXT'
);
