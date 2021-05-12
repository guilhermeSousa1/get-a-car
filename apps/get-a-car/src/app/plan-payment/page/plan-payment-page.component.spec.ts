import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MockComponent } from 'ng-mocks';
import { SubscriptionPlanComponent } from '@guilhermeSousa1/plan-payment/components/subscription-plan/subscription-plan.component';
import { BillingInfoComponent } from '@guilhermeSousa1/plan-payment/components/billing-info/billing-info.component';
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
        PlanPaymentPageComponent,
        MockComponent(SubscriptionPlanComponent),
        MockComponent(BillingInfoComponent)
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
