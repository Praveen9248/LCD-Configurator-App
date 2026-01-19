import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerSelectionPage } from './server-selection.page';

describe('ServerSelectionPage', () => {
  let component: ServerSelectionPage;
  let fixture: ComponentFixture<ServerSelectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
