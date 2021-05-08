import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { PlanPaymentPageComponent } from './plan-payment-page.component';

describe('PlanPaymentPageComponent', () => {
  let component: PlanPaymentPageComponent;
  let fixture: ComponentFixture<PlanPaymentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTabsModule,
        BrowserAnimationsModule
      ],
      declarations: [
        PlanPaymentPageComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
