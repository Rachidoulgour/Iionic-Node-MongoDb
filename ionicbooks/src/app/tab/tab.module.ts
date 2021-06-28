import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabPageRoutingModule } from './tab-routing.module';

import { TabPage } from './tab.page';


import { Routes, RouterModule } from '@angular/router';

/////////
const routes: Routes = [
  {
    // path: '',
    // component: TabPage
   path: 'tab',
    component: TabPage,
    children: [
      {
        path: 'home',
         
            loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
          
       
      },
      {
        path: '',
        redirectTo: '/app/tab/home',
        pathMatch: 'full'
      }
    ]
  }
];
/////////////////

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabPage]
})
export class TabPageModule {}
