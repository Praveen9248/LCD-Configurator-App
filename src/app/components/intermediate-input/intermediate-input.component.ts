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
  IonItemDivider,
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
    IonItemDivider,
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
  ) {
    effect(() => {
      if (this.isListFilter()) {
        this.form.disable({ emitEvent: false });
      } else {
        this.form.enable({ emitEvent: false });
        this.applyStyleRules(this.form.get('backgroundStyle')!.value);
      }
    });
  }

  form = this.fb.group({
    backgroundStyle: this.fb.control<'color' | 'image' | 'gradient'>('color'),
    backgroundColor: ['#ffffff'],
    backgroundImage: this.fb.group({
      type: ['image'],
      mime: [''],
      encoding: ['base64'],
      data: [''],
    }),
    backgroundGradient: this.fb.group({
      type: ['linear'],
      angle: [90, Validators.required],
      startColor: ['#ffffff', Validators.required],
      endColor: ['#000000', Validators.required],
    }),
  });

  isListFilter = computed(
    () => this.layoutContextService.value().template?.templateType === 'list'
  );



  ngOnInit() {
    const saved = this.layoutContextService.value().intermediate;

    if (saved) {
      this.form.patchValue(saved, { emitEvent: false });

      const savedStyle = saved.backgroundStyle;
      if (savedStyle) {
        this.applyStyleRules(savedStyle);
      }
    }

    this.form
      .get('backgroundStyle')!
      .valueChanges.subscribe((style) => this.applyStyleRules(style));

    this.applyTemplateRules();
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

    reader.readAsDataURL(file);
  }

  applyTemplateRules() {
    if (this.isListFilter()) {
      this.form.disable({ emitEvent: false });
    } else {
      this.form.enable({ emitEvent: false });
    }
  }

  applyStyleRules(style: 'color' | 'image' | 'gradient' | null) {
    this.clearStyleFields();

    if (this.isListFilter() || !style) {
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

    if (style === 'gradient') {
      const gradient = this.form.get('backgroundGradient')!;
      gradient.enable();

      gradient.get('angle')?.setValidators(Validators.required);
      gradient.get('startColor')?.setValidators(Validators.required);
      gradient.get('endColor')?.setValidators(Validators.required);

      gradient.updateValueAndValidity();
    }
  }

  clearStyleFields() {
    const color = this.form.get('backgroundColor')!;
    const image = this.form.get('backgroundImage')!;
    const gradient = this.form.get('backgroundGradient')!;

    color.clearValidators();
    color.disable();
    color.updateValueAndValidity();

    image.clearValidators();
    image.disable();
    image.updateValueAndValidity();

    gradient.disable();
    gradient.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.layoutContextService.update({
      intermediate: this.form.value,
    });
  }
}
