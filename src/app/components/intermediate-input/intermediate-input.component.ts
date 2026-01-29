import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  Input,
  OnInit,
  untracked,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutContextService } from 'src/app/services/context/layout-context-service';
import {
  IonItem,
  IonList,
  IonListHeader,
  IonText,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonNote,
} from '@ionic/angular/standalone';
import { handleStepForm } from 'src/app/interfaces/StepFormInterface';

@Component({
  selector: 'app-intermediate-input',
  standalone: true,
  imports: [
    IonNote,
    IonInput,
    IonText,
    IonListHeader,
    IonList,
    IonItem,
    CommonModule,
    ReactiveFormsModule,
    IonSelect,
    IonSelectOption,
  ],
  templateUrl: './intermediate-input.component.html',
  styleUrls: ['./intermediate-input.component.scss'],
})
export class IntermediateInputComponent implements OnInit, handleStepForm {
  @Input() stepConfig: any;

  constructor(
    private fb: FormBuilder,
    private layoutContextService: LayoutContextService
  ) {}

  form = this.fb.group({
    backgroundStyle: this.fb.control<'color' | 'image'>('color'),
    backgroundColor: ['#ffffff'],
    backgroundImage: this.fb.group({
      type: ['image'],
      mime: [''],
      encoding: ['base64'],
      data: [''],
    }),
  });

  isListFilter = computed(
    () => this.layoutContextService.value().templateType === 'list'
  );

  private _templateEffect = untracked(() => {
    if (this.isListFilter()) {
      this.form.disable({ emitEvent: false });
    } else {
      this.form.enable({ emitEvent: false });
      this.applyStyleRules(this.form.get('backgroundStyle')!.value);
    }
  });

  ngOnInit() {
    const saved = this.layoutContextService.value().intermediate;

    if (saved) {
      this.form.patchValue(saved);
    }

    this.form
      .get('backgroundStyle')!
      .valueChanges.subscribe((style) => this.applyStyleRules(style));
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];

      this.form.patchValue({
        backgroundImage: {
          type: 'image',
          mime: file.type,
          encoding: 'base64',
          data: base64,
        },
      });
    };
  }

  applyTemplateRules() {
    if (this.isListFilter()) {
      this.form.disable({ emitEvent: false });
    } else {
      this.form.enable({ emitEvent: false });
    }
  }

  applyStyleRules(style: 'color' | 'image' | null) {
    this.clearStyleFields();

    if (this.isListFilter()) {
      return;
    }

    if (style === 'color') {
      const c = this.form.get('backgroundColor')!;
      c.enable();
      c.setValidators(Validators.required);
      c.updateValueAndValidity();
    }

    if (style === 'image') {
      const c = this.form.get('backgroundImage')!;
      c.enable();
      c.setValidators(Validators.required);
      c.updateValueAndValidity();
    }
  }

  clearStyleFields() {
    ['backgroundColor', 'backgroundImage'].forEach((f) => {
      const c = this.form.get(f)!;
      c.reset();
      c.clearValidators();
      c.disable();
      c.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.layoutContextService.update({
      intermediate: this.form.value,
    });
  }
}
