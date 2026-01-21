import { ButtonInputComponent } from '../components/button-input/button-input.component';
import { ContentInputComponent } from '../components/content-input/content-input.component';
import { HeaderInputComponent } from '../components/header-input/header-input.component';
import { IntermediateInputComponent } from '../components/intermediate-input/intermediate-input.component';
import { ScreenSaverInputComponent } from '../components/screen-saver-input/screen-saver-input.component';
import { TemplateInputComponent } from '../components/template-input/template-input.component';

export const LayoutCodeMap: Record<any, any> = {
  TEMPLATE: TemplateInputComponent,
  BUTTON: ButtonInputComponent,
  HEADER: HeaderInputComponent,
  CONTENT: ContentInputComponent,
  SCREEN_SAVER: ScreenSaverInputComponent,
  INTERMEDIATE: IntermediateInputComponent,
};
