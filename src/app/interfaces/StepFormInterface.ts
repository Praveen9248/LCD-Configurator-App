import { FormGroup } from '@angular/forms';

export interface handleStepForm {
  form: FormGroup;
  onSubmit(): void;
}
