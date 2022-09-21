import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { AuthGuardService } from './Interceptor/auth-guard.service';
import { LiveModule } from './live/live.module';
import { UserModule } from './user/user.module';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => AdminModule,
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    loadChildren: () => HomeModule,
  },
  {
    path: 'home',
    loadChildren: () => HomeModule,
  },
  {
    path: 'auth',
    loadChildren: () => AuthModule,
  },
  {
    path: 'user',
    loadChildren: () => UserModule,
    canActivate: [AuthGuardService],
  },
  {
    path: 'live',
    loadChildren: () => LiveModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
