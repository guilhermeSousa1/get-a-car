import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '@guilhermeSousa1/material.module';

const COMPONENTS = [
  SidebarNavComponent,
  ToolbarComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ComponentsModule {
}
