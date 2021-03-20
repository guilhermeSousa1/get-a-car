import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCarPreferencesDialogComponent } from './edit-car-preferences.dialog.component';

describe('EditCarPreferencesComponent', () => {
  let component: EditCarPreferencesDialogComponent;
  let fixture: ComponentFixture<EditCarPreferencesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCarPreferencesDialogComponent]
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
