import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { EMPTY } from 'rxjs';
import { MockProvider } from 'ng-mocks';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
      ],
      declarations: [
        ToolbarComponent
      ],
      providers: [
        MockProvider(Router, {
          events: EMPTY
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit openSidebar event', () => {
    const openSidebarButton = debugElement.query(By.css('[data-testid="sidebar-button"]')).nativeElement;
    const openSidebarSpy = jest.spyOn(component.openSidebar, 'emit');

    openSidebarButton.click();

    expect(openSidebarSpy).toHaveBeenCalledTimes(1);
  });
});
