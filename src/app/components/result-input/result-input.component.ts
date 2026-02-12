import { Component, computed, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutContextService } from 'src/app/services/context/layout-context-service';
import { IonList, IonListHeader, IonText, IonItemDivider, IonLabel, IonItem, IonSelect, IonSelectOption, IonInput } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { handleStepForm } from 'src/app/interfaces/StepFormInterface';

@Component({
  selector: 'app-result-input',
  standalone: true,
  imports: [IonList, IonListHeader, IonText, IonItemDivider, IonLabel, IonItem, IonSelect, IonSelectOption, IonInput, CommonModule, ReactiveFormsModule],
  templateUrl: './result-input.component.html',
  styleUrls: ['./result-input.component.scss'],
})
export class ResultInputComponent implements OnInit, handleStepForm {

  constructor(private fb: FormBuilder, private layoutContextService: LayoutContextService) { }

  templates = [
    { label: 'Template 1', value: 'R0001' },
    { label: 'Template 2', value: 'R0010' },
    { label: 'Template 3', value: 'R0100' },
    { label: 'Template 4', value: 'R1000' },
  ]

  currentTemplateOptions = computed(() => this.layoutContextService.value().template?.templateType !== 'nested' ? this.templates.slice(0, 2) : this.templates.slice(2))


  private createFormGroup() {
    return this.fb.group({
      backgroundStyle: this.fb.control<'color' | 'gradient'>('color'),
      backgroundColor: ['#ffffff'],
      backgroundGradient: this.fb.group({
        type: ['linear'],
        angle: [90, Validators.required],
        startColor: ['#ffffff', Validators.required],
        endColor: ['#000000', Validators.required],
      }),
    })
  }

  form = this.fb.group({
    template: ['', Validators.required],
    container: this.createFormGroup(),
    active: this.createFormGroup(),
    inactive: this.createFormGroup(),
    output: this.createFormGroup(),
  })

  ngOnInit() {
    const saved = this.layoutContextService.value().result;
    if (saved) {
      this.form.patchValue(saved);
    }
  }

  getSectionLabel(section: string): string {
    const labels: Record<string, string> = {
      container: 'Container',
      active: 'Active State',
      inactive: 'Inactive State',
      output: 'Output'
    };
    return labels[section] || section;
  }

  cleanFormData() {
    const data = this.form.value;
    const cleanedData = { ...data };

    const sections = ['container', 'active', 'inactive', 'output'] as const;
    sections.forEach(section => {
      const sectionData = cleanedData[section] as {
        backgroundStyle: 'color' | 'gradient';
        backgroundColor?: string;
        backgroundGradient?: {
          type: 'linear';
          angle: number;
          startColor: string;
          endColor: string;
        };
      };
      if (sectionData.backgroundStyle === 'color') {
        delete sectionData.backgroundGradient;
      } else if (sectionData.backgroundStyle === 'gradient') {
        delete sectionData.backgroundColor;
      }
    })
    return cleanedData;
  }

  onSubmit(): void {
    this.layoutContextService.update({
      result: this.cleanFormData()
    })
  }
}
