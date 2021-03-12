import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

/** Definition of the module's routes */
const routes: Routes = [
  {
    path: 'request',
    loadChildren: () => import('./request/request.module').then((m) => m.RequestModule)
  },
  {
    path: 'nav',
    loadChildren: () => import('./request/request.module').then((m) => m.RequestModule)
  },
  {
    path: '',
    redirectTo: 'request',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
