import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormfileuploadComponent } from './formfileupload.component';

describe('FormfileuploadComponent', () => {
  let component: FormfileuploadComponent;
  let fixture: ComponentFixture<FormfileuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormfileuploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormfileuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
