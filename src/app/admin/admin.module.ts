import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashbordComponent } from './dashbord/dashbord.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartDountCountComponent } from './Charts/chart-dount-count/chart-dount-count.component';
import { AppChartAreaCountComponent } from './Charts/chart-area-count/app-chart-area-count.component';
import { ChartLineProfitAndLosessComponent } from './Charts/chart-line-profit-and-losess/chart-line-profit-and-losess.component';
import { CountCustomerOrVisaCardComponent } from './count-customer-or-visa-card/count-customer-or-visa-card.component';
import { TopUserFollowerComponent } from './topList/top-user-follower/top-user-follower.component';
import { TopVideoLikeComponent } from './topList/top-video-like/top-video-like.component';
import { UsersComponent } from './users/users.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '../shared/shared.module';
import { VideosComponent } from './videos/videos.component';
import { PromoteTypeComponent } from './promote-type/promote-type.component';
import { PromoteComponent } from './promote/promote.component';
import { VisaCardComponent } from './visa-card/visa-card.component';
import { PrfileUsersComponent } from './users/prfile-users/prfile-users.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { CommnetComponent } from './commnet/commnet.component';
import { LikesComponent } from './likes/likes.component';
import { HomePageEditComponent } from './home-page-edit/home-page-edit.component';
import { InboxMailComponent } from './inbox-mail/inbox-mail.component';
import { InboxSidebarComponent } from './inbox-mail/inbox-sidebar/inbox-sidebar.component';
import { ShowEmailComponent } from './inbox-mail/show-email/show-email.component';
import { SentMailComponent } from './inbox-mail/sent-mail/sent-mail.component';

@NgModule({
  declarations: [
    DashbordComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ChartLineProfitAndLosessComponent,
    AppChartAreaCountComponent,
    ChartDountCountComponent,
    CountCustomerOrVisaCardComponent,
    TopUserFollowerComponent,
    TopVideoLikeComponent,
    UsersComponent,
    VideosComponent,
    PromoteTypeComponent,
    PromoteComponent,
    VisaCardComponent,
    PrfileUsersComponent,
    ProfileAdminComponent,
    CommnetComponent,
    LikesComponent,
    HomePageEditComponent,
    InboxMailComponent,
    InboxSidebarComponent,
    ShowEmailComponent,
    SentMailComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgApexchartsModule,
    MatTableModule,
    MatPaginatorModule,
    SharedModule,
    MatNativeDateModule,
  ],
})
export class AdminModule {}
