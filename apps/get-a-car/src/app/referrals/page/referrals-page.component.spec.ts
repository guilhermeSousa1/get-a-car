import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Clipboard } from '@angular/cdk/clipboard';
import { HarnessLoader, TestKey } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatChipInputHarness, MatChipListHarness } from '@angular/material/chips/testing';
import { MatChipsModule } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MockComponent, MockProvider } from 'ng-mocks';
import { ReferralStepComponent } from '@guilhermeSousa1/referrals/components/referral-step/referral-step.component';
import { ReferralsPageComponent } from './referrals-page.component';

describe('ReferralsPageComponent', () => {
  let component: ReferralsPageComponent;
  let fixture: ComponentFixture<ReferralsPageComponent>;
  let loader: HarnessLoader;
  let rootLoader: HarnessLoader;
  let debugElement: DebugElement;

  const mockSnackBarOpen = jest.fn();
  const mockClipboardCopy = jest.fn();

  beforeEach(async () => {
    jest.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatChipsModule,
        MatIconTestingModule,
        MatButtonModule,
        MatInputModule
      ],
      declarations: [
        ReferralsPageComponent,
        MockComponent(MatIcon),
        MockComponent(ReferralStepComponent)
      ],
      providers: [
        MockProvider(Clipboard, {
          copy: mockClipboardCopy
        }),
        MockProvider(MatSnackBar, {
          open: mockSnackBarOpen
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralsPageComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add valid email to the email list', async () => {
    const addSpy = jest.spyOn(component, 'add');
    const email = 'myCoolEmail@hello.com';
    const chipInput = await loader.getHarness(MatChipInputHarness);
    const sendButton = debugElement.query(By.css('[data-testid="send-button"]')).nativeElement;

    await chipInput.setValue(email);
    await chipInput.sendSeparatorKey(TestKey.ENTER);
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledTimes(1);
    expect(component.emails.length).toBe(1);
    expect(component.emails[0]).toStrictEqual({ value: email, valid: true });
    expect(sendButton.disabled).toBeFalsy();
  });

  it('should not add invalid email to the email list', async () => {
    const addSpy = jest.spyOn(component, 'add');
    const email = 'invalidEmail';
    const chipInput = await loader.getHarness(MatChipInputHarness);
    const sendButton = debugElement.query(By.css('[data-testid="send-button"]')).nativeElement;

    await chipInput.setValue(email);
    await chipInput.sendSeparatorKey(TestKey.ENTER);
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledTimes(1);
    expect(component.emails.length).toBe(1);
    expect(component.emails[0]).toStrictEqual({ value: email, valid: false });
    expect(sendButton.disabled).toBeTruthy();
  });

  describe('one valid and one invalid emails in the emails list', () => {
    beforeEach(() => {
      component.add({ value: 'myCoolEmail@hello.com', input: null });
      component.add({ value: 'invalidEmail', input: null });
      fixture.detectChanges();
    });

    it('should remove valid email', async () => {
      const removeSpy = jest.spyOn(component, 'remove');
      const matChipListElement = await loader.getHarness(MatChipListHarness);
      const chipList = await matChipListElement.getChips();
      const sendButton = debugElement.query(By.css('[data-testid="send-button"]')).nativeElement;

      await chipList[0].remove();
      fixture.detectChanges();

      expect(removeSpy).toHaveBeenCalledTimes(1);
      expect(component.emails.length).toBe(1);
      expect(sendButton.disabled).toBeTruthy();
    });

    it('should remove invalid email', async () => {
      const removeSpy = jest.spyOn(component, 'remove');
      const matChipListElement = await loader.getHarness(MatChipListHarness);
      const chipList = await matChipListElement.getChips();
      const sendButton = debugElement.query(By.css('[data-testid="send-button"]')).nativeElement;

      await chipList[1].remove();
      fixture.detectChanges();

      expect(removeSpy).toHaveBeenCalledTimes(1);
      expect(component.emails.length).toBe(1);
      expect(sendButton.disabled).toBeFalsy();
    });

    it('should remove both emails', async () => {
      const removeSpy = jest.spyOn(component, 'remove');
      const matChipListElement = await loader.getHarness(MatChipListHarness);
      const chipList = await matChipListElement.getChips();
      const sendButton = debugElement.query(By.css('[data-testid="send-button"]')).nativeElement;

      for (const chip of chipList) {
        await chip.remove();
      }
      fixture.detectChanges();

      expect(removeSpy).toHaveBeenCalledTimes(2);
      expect(component.emails.length).toBe(0);
      expect(sendButton.disabled).toBeTruthy();
    });
  });

  describe('one valid email in the emails list', () => {
    beforeEach(() => {
      component.add({ value: 'myCoolEmail@hello.com', input: null });
      fixture.detectChanges();
    });

    it('should clear email list and show snackBar', () => {
      const sendEmailInvitationsSpy = jest.spyOn(component, 'sendEmailInvitations');
      const sendButton = debugElement.query(By.css('[data-testid="send-button"]')).nativeElement;

      sendButton.click();
      fixture.detectChanges();

      expect(sendEmailInvitationsSpy).toHaveBeenCalledTimes(1);
      expect(component.emails.length).toBe(0);
      expect(mockSnackBarOpen).toHaveBeenCalledTimes(1);
      expect(sendButton.disabled).toBeTruthy();
    });
  });

  it('should copy referral link and show snackBar', () => {
    const copyReferralLinkSpy = jest.spyOn(component, 'copyReferralLink');
    const copyReferralLinkButton = debugElement.query(By.css('[data-testid="copy-referral-button"]')).nativeElement;

    copyReferralLinkButton.click();
    fixture.detectChanges();

    expect(copyReferralLinkSpy).toHaveBeenCalledTimes(1);
    expect(mockClipboardCopy).toHaveBeenCalledTimes(1);
    expect(mockSnackBarOpen).toHaveBeenCalledTimes(1);
  });
});
