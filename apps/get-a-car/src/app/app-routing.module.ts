import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

/** Definition of the module's routes */
const routes: Routes = [
  {
    path:         'request',
    loadChildren: () => import('./request/request.module').then((m) => m.RequestModule)
  },
  {
    path:         'my-trips',
    loadChildren: () => import('./my-trips/my-trips.module').then((m) => m.MyTripsModule)
  },
  {
    path:         'referrals',
    loadChildren: () => import('./referrals/referrals.module').then((m) => m.ReferralsModule)
  },
  {
    path:       '',
    redirectTo: 'request',
    pathMatch:  'full'
  },
  {
    path:       '**',
    redirectTo: 'request'
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
