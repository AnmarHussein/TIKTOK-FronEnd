import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommnetComponent } from './commnet/commnet.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HomePageEditComponent } from './home-page-edit/home-page-edit.component';
import { InboxMailComponent } from './inbox-mail/inbox-mail.component';
import { SentMailComponent } from './inbox-mail/sent-mail/sent-mail.component';
import { ShowEmailComponent } from './inbox-mail/show-email/show-email.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { PromoteTypeComponent } from './promote-type/promote-type.component';
import { PromoteComponent } from './promote/promote.component';
import { PrfileUsersComponent } from './users/prfile-users/prfile-users.component';
import { UsersComponent } from './users/users.component';
import { VideosComponent } from './videos/videos.component';
import { VisaCardComponent } from './visa-card/visa-card.component';

const routes: Routes = [
  {
    path: '',
    component: DashbordComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'videos',
    component: VideosComponent,
  },
  {
    path: 'promotetype',
    component: PromoteTypeComponent,
  },
  {
    path: 'promote',
    component: PromoteComponent,
  },
  {
    path: 'visacard',
    component: VisaCardComponent,
  },
  {
    path: 'myprofile',
    component: ProfileAdminComponent,
  },
  {
    path: 'profileUsers',
    component: PrfileUsersComponent,
  },
  {
    path: 'commnet',
    component: CommnetComponent,
  },
  {
    path: 'EditHomePage',
    component: HomePageEditComponent,
  },
  {
    path: 'InboxMail',
    component: InboxMailComponent,
  },
  {
    path: 'ImportantMail',
    component: InboxMailComponent,
  },
  {
    path: 'TrashMail',
    component: InboxMailComponent,
  },
  {
    path: 'InboxMail/ShowMail',
    component: ShowEmailComponent,
  },
  {
    path: 'InboxMail/SentEmail',
    component: SentMailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
