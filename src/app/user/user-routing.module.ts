import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from './billing/billing.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FollowerComponent } from './follower/follower.component';
import { FollowingComponent } from './following/following.component';
import { ProfileComponent } from './profile/profile.component';
import { PromoteComponent } from './promote/promote.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: 'follower',
    component: FollowerComponent,
  },
  {
    path: 'following',
    component: FollowingComponent,
  },
  {
    path: 'videos',
    component: VideosComponent,
  },
  {
    path: 'editProfile',
    component: EditProfileComponent,
  },
  {
    path: 'billing',
    component: BillingComponent,
  },
  {
    path: 'promote',
    component: PromoteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
