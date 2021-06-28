import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage
  //  path: 'tab',
  //   component: TabPage,
  //   children: [
  //     {
  //       path: 'home',
         
  //           loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
          
       
  //     },
  //     {
  //       path: '',
  //       redirectTo: '/app/tab/home',
  //       pathMatch: 'full'
  //     }
  //   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
