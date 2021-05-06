import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { ReferralStepComponent } from './referral-step.component';

describe('ReferralStepComponent', () => {
  let component: ReferralStepComponent;
  let fixture: ComponentFixture<ReferralStepComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule
      ],
      declarations: [
        ReferralStepComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralStepComponent);
    component = fixture.componentInstance;
    component.icon = 'icon';
    component.title = 'title';
    component.description = 'description';
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the inputs correctly', () => {
    const icon = debugElement.query(By.css(`[data-testid="icon"]`)).nativeElement;
    const title = debugElement.query(By.css(`[data-testid="title"]`)).nativeElement;
    const description = debugElement.query(By.css(`[data-testid="description"]`)).nativeElement;

    expect(icon.textContent.trim()).toBe(component.icon);
    expect(title.textContent.trim()).toBe(component.title);
    expect(description.textContent.trim()).toBe(component.description);
  });
});
