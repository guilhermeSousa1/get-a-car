import { Component } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';

/** The email data type */
type email = { value: string, valid: boolean };

/* eslint-disable no-multi-spaces */
@Component({
  selector:    'referrals-page',
  templateUrl: './referrals-page.component.html',
  styleUrls:   ['./referrals-page.component.scss']
})
export class ReferralsPageComponent {

  /** The list of emails */
  public emails: email[] = [];
  /** Flag indicating if the list of emails is valid */
  public isEmailListValid = false;
  /** The referral link */
  public referralLink = 'get-a-car.netlify.app/referral=23748623';
  /** The separator key codes for the mat-chip-list */
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  /**
   * Class constructor.
   *
   * @public
   * @param clipboard  Injection of the Clipboard service
   * @param snackBar   Injection of the MatSnackBar service
   */
  constructor(private clipboard: Clipboard,
              private snackBar: MatSnackBar) {
  }

  /**
   * Event handler for the addition of a chip to the chip-list.
   *
   * @public
   * @param event  The MatChip input event.
   */
  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (this.validateEmail(value)) {
        this.emails.push({ value: value.trim(), valid: true });
      } else {
        this.emails.push({ value: value.trim(), valid: false });
      }
    }

    if (input) {
      input.value = '';
    }

    this.isEmailListValid = this.emails.length > 0 ? this.emails.every((email) => !!email.valid) : false;
  }

  /**
   * Event handler for the removal of an email from the chip-list.
   *
   * @public
   * @param selectedEmail  The email to be removed.
   */
  public remove(selectedEmail: string): void {
    this.emails = this.emails.filter((email) => email.value !== selectedEmail);
    this.isEmailListValid = this.emails.length > 0 ? this.emails.every((email) => !!email.valid) : false;
  }

  /**
   * Click event handler for sending the email invitations
   *
   * @public
   */
  public sendEmailInvitations(): void {
    this.emails = [];
    this.isEmailListValid = false;
    this.snackBar.open('Email invitations have been sent successfully', 'X',
      { panelClass: ['success-notification'], duration: 5000, horizontalPosition: 'end', verticalPosition: 'top' });
  }

  /**
   * Click event handler for the copying action of the referral link
   *
   * @public
   */
  public copyReferralLink(): void {
    this.clipboard.copy(this.referralLink);
    this.snackBar.open('Referral link successfully copied', 'X',
      { panelClass: ['success-notification'], duration: 5000, horizontalPosition: 'end', verticalPosition: 'top' });
  }

  /**
   * Checks if an email is valid.
   *
   * @private
   * @param email  The email to be checked.
   * @returns      {boolean}
   */
  private validateEmail(email: string): boolean {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegEx.test(email.toLowerCase());
  }
}
