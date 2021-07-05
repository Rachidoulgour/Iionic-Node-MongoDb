import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import {TabPage} from './tab/tab.page'

const routes: Routes = [
  // {
  //   path: 'tab/home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'tab',
    loadChildren: () => import('./tab/tab.module').then( m => m.TabPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  // {
  //   path: 'tab/publish',
  //   loadChildren: () => import('./publish/publish.module').then( m => m.PublishPageModule)
  // },
  // {
  //   path: 'tab',
  //   component: TabPage,
  //   children: [
  //     {
  //       path: 'home',
         
  //           loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
          
       
  //     },
  //     {
  //       path: '',
  //       redirectTo: '/app/tab/home',
  //       pathMatch: 'full'
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
