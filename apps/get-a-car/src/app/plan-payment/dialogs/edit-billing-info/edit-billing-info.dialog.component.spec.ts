import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBillingInfoDialogComponent } from '@guilhermeSousa1/plan-payment/dialogs/edit-billing-info/edit-billing-info.dialog.component';

describe('EditBillingInfoComponent', () => {
  let component: EditBillingInfoDialogComponent;
  let fixture: ComponentFixture<EditBillingInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBillingInfoDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBillingInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
