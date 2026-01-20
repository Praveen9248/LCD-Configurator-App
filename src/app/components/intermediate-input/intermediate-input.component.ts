import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-intermediate-input',
  templateUrl: './intermediate-input.component.html',
  styleUrls: ['./intermediate-input.component.scss'],
})
export class IntermediateInputComponent implements OnInit {
  @Input() stepConfig: any;
  constructor() {}

  ngOnInit() {}
}
