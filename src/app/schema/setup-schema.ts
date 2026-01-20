import { ButtonInputComponent } from '../components/button-input/button-input.component';
import { ContentInputComponent } from '../components/content-input/content-input.component';
import { HeaderInputComponent } from '../components/header-input/header-input.component';
import { IntermediateInputComponent } from '../components/intermediate-input/intermediate-input.component';
import { ScreenSaverInputComponent } from '../components/screen-saver-input/screen-saver-input.component';
import { TemplateInputComponent } from '../components/template-input/template-input.component';

export interface WizardStep {
  id: string;
  component: any;
  rules?: stepRule[];
}

export interface stepRule {
  when: (ctx: any) => boolean;
  disable?: boolean;
  warning?: string;
}

export const SETUP_SCHEMA: WizardStep[] = [
  { id: 'template', component: TemplateInputComponent },
  { id: 'button', component: ButtonInputComponent },
  { id: 'header', component: HeaderInputComponent },
  { id: 'content', component: ContentInputComponent },
  { id: 'screenSaver', component: ScreenSaverInputComponent },
  {
    id: 'intermediate',
    component: IntermediateInputComponent,
    rules: [
      {
        when: (ctx) => ctx.templateType === 'list',
        disable: true,
        warning: 'Intermediate page is disabled for list filter templates',
      },
    ],
  },
];
