import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveRoutingModule } from './live-routing.module';
import { StreamComponent } from './stream/stream.component';
import { RoomComponent } from './room/room.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    StreamComponent,
    RoomComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    LiveRoutingModule,
    SharedModule
  ]
})
export class LiveModule { }
