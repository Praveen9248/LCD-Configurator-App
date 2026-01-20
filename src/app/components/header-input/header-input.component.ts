import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutContextService } from 'src/app/services/context/layout-context-service';
import {
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonListHeader,
  IonText,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-input',
  standalone: true,
  imports: [
    IonText,
    IonListHeader,
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './header-input.component.html',
  styleUrls: ['./header-input.component.scss'],
})
export class HeaderInputComponent implements OnInit {
  @Input() stepConfig: any;

  constructor(
    private fb: FormBuilder,
    private layoutContextService: LayoutContextService
  ) {}

  form = this.fb.group({
    headerType: [null, Validators.required],
  });

  ngOnInit() {
    const saved = this.layoutContextService.value.header;
    if (saved) {
      this.form.patchValue(saved);
    }

    this.form.valueChanges.subscribe((val) => {
      this.layoutContextService.update({ header: val });
    });
  }
}
