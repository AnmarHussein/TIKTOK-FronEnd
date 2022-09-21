import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FollowerComponent } from './follower/follower.component';
import { FollowingComponent } from './following/following.component';
import { VideosComponent } from './videos/videos.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { BillingComponent } from './billing/billing.component';
import { PromoteComponent } from './promote/promote.component';

@NgModule({
  declarations: [
    ProfileComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    FollowerComponent,
    FollowingComponent,
    VideosComponent,
    EditProfileComponent,
    BillingComponent,
    PromoteComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
