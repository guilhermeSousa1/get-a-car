import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralStepComponent } from './referral-step.component';

describe('ReferralStepComponent', () => {
  let component: ReferralStepComponent;
  let fixture: ComponentFixture<ReferralStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ReferralStepComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
