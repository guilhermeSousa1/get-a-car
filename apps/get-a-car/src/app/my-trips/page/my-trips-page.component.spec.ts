import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MockComponent } from 'ng-mocks';
import { PlannedTripsComponent } from '@guilhermeSousa1/my-trips/components/planned-trips/planned-trips.component';
import { PastTripsComponent } from '@guilhermeSousa1/my-trips/components/past-trips/past-trips.component';
import { MyTripsPageComponent } from './my-trips-page.component';

describe('MyTripsPageComponent', () => {
  let component: MyTripsPageComponent;
  let fixture: ComponentFixture<MyTripsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatTabsModule
      ],
      declarations: [
        MyTripsPageComponent,
        MockComponent(PlannedTripsComponent),
        MockComponent(PastTripsComponent)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTripsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
