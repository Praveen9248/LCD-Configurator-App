import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutContextService } from 'src/app/services/context/layout-context-service';
import {
  IonList,
  IonListHeader,
  IonText,
  IonItem,
  IonRadioGroup,
  IonRadio,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { handleStepForm } from 'src/app/interfaces/StepFormInterface';

@Component({
  selector: 'app-template-input',
  standalone: true,
  imports: [
    IonRadio,
    IonRadioGroup,
    IonItem,
    IonText,
    IonListHeader,
    IonList,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './template-input.component.html',
  styleUrls: ['./template-input.component.scss'],
})
export class TemplateInputComponent implements handleStepForm, OnInit {
  @Input({ required: true }) stepConfig: any;

  constructor(
    private fb: FormBuilder,
    private layoutContextService: LayoutContextService
  ) {}

  form = this.fb.group({
    templateType: this.fb.control<'list' | 'nested'>('nested', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngOnInit() {
    const saved = this.layoutContextService.value().templateType;
    if (saved) {
      this.form.patchValue({ templateType: saved });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.layoutContextService.update({
      templateType: this.form.getRawValue().templateType,
    });
  }
}
