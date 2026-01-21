import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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

  isListFilter = false;

  constructor(
    private fb: FormBuilder,
    private layoutContextService: LayoutContextService
  ) {}

  form = this.fb.group({
    backgroundStyle: this.fb.control<'color' | 'image'>('color'),
    backgroundColor: ['#ffffff'],
    backgroundImageUrl: [''],
  });

  ngOnInit() {
    const templateType = this.layoutContextService.value.templateType;

    this.isListFilter = templateType === 'list';

    const saved = this.layoutContextService.value.intermediate;
    console.log(saved);
    if (saved) {
      Promise.resolve().then(() => {
        this.form.patchValue(saved);
      });
    }

    this.form
      .get('backgroundStyle')!
      .valueChanges.subscribe((style) => this.applyStyleRules(style));

    this.applyTemplateRules();
    this.applyStyleRules(this.form.get('backgroundStyle')!.value);
  }

  applyTemplateRules() {
    if (this.isListFilter) {
      this.form.disable({ emitEvent: false });
    } else {
      this.form.enable({ emitEvent: false });
    }
  }

  applyStyleRules(style: 'color' | 'image' | null) {
    this.clearStyleFields();

    if (this.isListFilter) {
      return;
    }

    if (style === 'color') {
      const c = this.form.get('backgroundColor')!;
      c.enable();
      c.setValidators(Validators.required);
      c.updateValueAndValidity();
    }

    if (style === 'image') {
      const c = this.form.get('backgroundImageUrl')!;
      c.enable();
      c.setValidators(Validators.required);
      c.updateValueAndValidity();
    }
  }

  clearStyleFields() {
    ['backgroundColor', 'backgroundImageUrl'].forEach((f) => {
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
