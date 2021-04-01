import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCarPreferencesDialogComponent } from './edit-car-preferences.dialog.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MockProvider } from 'ng-mocks';
import defaultCarPreferences from '../../page/config/default-car-preferences.json';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditCarPreferencesComponent', () => {
  let component: EditCarPreferencesDialogComponent;
  let fixture: ComponentFixture<EditCarPreferencesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      declarations: [
        EditCarPreferencesDialogComponent
      ],
      providers: [
        FormBuilder,
        MockProvider(MatDialogRef),
        MockProvider(MAT_DIALOG_DATA, {
          carPreferences: defaultCarPreferences
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarPreferencesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
