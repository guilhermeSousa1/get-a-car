import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EMPTY } from 'rxjs';
import { MockComponent, MockProvider } from 'ng-mocks';
import { SidebarNavComponent, ToolbarComponent } from '@guilhermeSousa1/shared/components';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent,
        MockComponent(SidebarNavComponent),
        MockComponent(ToolbarComponent)
      ],
      providers: [
        MockProvider(BreakpointObserver, {
          observe: () => EMPTY
        })
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should change the value of the sidebarOpened on toolbar open', () => {
    const sidebarOpenedNextSpy = jest.spyOn(component.sidebarOpened$, 'next');
    const toolbarComponent = debugElement.query(By.directive(ToolbarComponent)).componentInstance;

    toolbarComponent.openSidebar.emit();

    expect(sidebarOpenedNextSpy).toHaveBeenCalledTimes(1);
    expect(sidebarOpenedNextSpy).toHaveBeenCalledWith(true);
  });

  it('should change the value of the sidebarOpened on sidenav close', () => {
    const sidebarOpenedNextSpy = jest.spyOn(component.sidebarOpened$, 'next');
    const matSidenavComponent = debugElement.query(By.css('mat-sidenav')).nativeElement;

    matSidenavComponent.dispatchEvent(new Event('closedStart'));

    expect(sidebarOpenedNextSpy).toHaveBeenCalledTimes(1);
    expect(sidebarOpenedNextSpy).toHaveBeenCalledWith(false);
  });
});
