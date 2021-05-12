import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';
import { MockPipe, MockProvider } from 'ng-mocks';
import { DataService } from '@guilhermeSousa1/core/services/data/data.service';
import { HideCreditCardNumberPipe } from '@guilhermeSousa1/shared/pipes/hide-credit-card/hide-credit-card-number.pipe';
import { EditBillingInfoDialogComponent } from '@guilhermeSousa1/plan-payment/dialogs/edit-billing-info/edit-billing-info.dialog.component';
import { testBillingInfo } from '@guilhermeSousa1/core/test-utils';
import { BillingInfoComponent } from './billing-info.component';

describe('BillingInfoComponent', () => {
  let component: BillingInfoComponent;
  let fixture: ComponentFixture<BillingInfoComponent>;
  let debugElement: DebugElement;

  const mockTransform = jest.fn();
  const mockOpen = jest.fn().mockReturnValue({ afterClosed: () => of(testBillingInfo) });
  const mockUpdateBillingInfo = jest.fn().mockReturnValue(of(null));
  const mockGetBillingInfo = jest.fn().mockReturnValue(of([testBillingInfo]));

  beforeEach(async () => {
    jest.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [
        MatDividerModule,
        MatButtonModule
      ],
      declarations: [
        BillingInfoComponent,
        MockPipe(HideCreditCardNumberPipe, mockTransform)
      ],
      providers: [
        MockProvider(DataService, {
          getBillingInfo:    mockGetBillingInfo,
          updateBillingInfo: mockUpdateBillingInfo
        }),
        MockProvider(MatDialog, {
          open: mockOpen
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show car preferences', () => {
    const postalCode = debugElement.query(By.css(`[data-testid="postal-code"]`)).nativeElement;
    const cardHolderName = debugElement.query(By.css(`[data-testid="card-holder-name"]`)).nativeElement;
    const cardNumber = debugElement.query(By.css(`[data-testid="card-number"]`)).nativeElement;
    const cardExpirationDate = debugElement.query(By.css(`[data-testid="card-expiration-date"]`)).nativeElement;

    expect(postalCode.textContent.trim()).toBe(testBillingInfo.postalCode);
    expect(cardHolderName.textContent.trim()).toBe(testBillingInfo.cardHolderName);
    expect(cardNumber).toBeTruthy();
    expect(mockTransform).toHaveBeenCalledTimes(1);
    expect(cardExpirationDate.textContent.trim()).toBe(testBillingInfo.cardExpirationDate);
  });

  it('should open EditBillingInfoDialogComponent', () => {
    const editDataButton = debugElement.query(By.css(`[data-testid="edit-data-button"]`)).nativeElement;
    editDataButton.click();

    expect(mockOpen).toHaveBeenCalledTimes(1);
    expect(mockOpen).toHaveBeenCalledWith(EditBillingInfoDialogComponent, expect.anything());
  });

  it('should update the billing info on EditBillingInfoDialogComponent close', () => {
    const editDataButton = debugElement.query(By.css(`[data-testid="edit-data-button"]`)).nativeElement;
    editDataButton.click();

    expect(mockUpdateBillingInfo).toHaveBeenCalledTimes(1);
    expect(mockUpdateBillingInfo).toHaveBeenCalledWith(testBillingInfo);
    expect(mockGetBillingInfo).toHaveBeenCalledTimes(2);
  });
});
