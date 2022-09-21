import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { VideoComponent } from './video/video.component';
import { LikesComponent } from './likes/likes.component';
import { FolloweComponent } from './followe/followe.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ContactComponent } from './contact/contact.component';
import { AllLiveComponent } from './all-live/all-live.component';
import { CreateLiveComponent } from './create-live/create-live.component';

@NgModule({
  declarations: [
    HomepageComponent,
    NavbarComponent,
    VideoComponent,
    LikesComponent,
    FolloweComponent,
    SidebarComponent,
    UserPageComponent,
    ContactComponent,
    AllLiveComponent,
    CreateLiveComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
