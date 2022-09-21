import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllLiveComponent } from './all-live/all-live.component';
import { ContactComponent } from './contact/contact.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'userPage',
    component: UserPageComponent,
  },
  {
    path: 'AllLive',
    component: AllLiveComponent,
  },
  {
    path: 'ContactUs',
    component: ContactComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
