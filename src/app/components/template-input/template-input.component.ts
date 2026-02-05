import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutContextService } from 'src/app/services/context/layout-context-service';
import {
  IonList,
  IonListHeader,
  IonText,
  IonItem,
  IonItemDivider,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { handleStepForm } from 'src/app/interfaces/StepFormInterface';
import { ListTemplate, NestedTemplate } from 'src/app/interfaces/template.model';

@Component({
  selector: 'app-template-input',
  standalone: true,
  imports: [
    IonItem,
    IonText,
    IonListHeader,
    IonItemDivider,
    IonList,
    CommonModule,
    ReactiveFormsModule,
    IonSelect,
    IonSelectOption,
  ],
  templateUrl: './template-input.component.html',
  styleUrls: ['./template-input.component.scss'],
})
export class TemplateInputComponent implements handleStepForm, OnInit {
  @Input({ required: true }) stepConfig: any;

  constructor(
    private fb: FormBuilder,
    private layoutContextService: LayoutContextService
  ) { }

  form = this.fb.group({
    templateType: this.fb.control<'list' | 'nested'>('nested', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    flowType: this.fb.control<'CATEGORY' | 'ETC'>('CATEGORY', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngOnInit() {
    const saved = this.layoutContextService.value();
    if (saved?.template?.templateType) {
      this.form.patchValue({ templateType: saved.template.templateType });
    }

    if (saved?.template?.flowType) {
      this.form.patchValue({ flowType: saved.template.flowType });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.layoutContextService.update({
      template: this.form.value
    });
    this.layoutContextService.update({
      flow: this.form.value.templateType === 'nested' ? NestedTemplate : ListTemplate
    })
  }
}
