import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistancecalculatorComponent } from './distancecalculator.component';

describe('DistancecalculatorComponent', () => {
  let component: DistancecalculatorComponent;
  let fixture: ComponentFixture<DistancecalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistancecalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistancecalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
