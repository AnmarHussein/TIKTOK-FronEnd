import { Component, OnInit } from '@angular/core';
import AgoraRTM, { RtmChannel, RtmClient } from 'agora-rtm-sdk';
import { NgxSpinnerService } from 'ngx-spinner';
import { LiveService } from 'src/app/Service/live.service';

@Component({
  selector: 'app-all-live',
  templateUrl: './all-live.component.html',
  styleUrls: ['./all-live.component.css'],
})
export class AllLiveComponent implements OnInit {
  allChannel: any;
  AllChannelActive: any = [];
  rtmClint?: RtmClient;
  channel?: RtmChannel;
  options = {
    // Pass your app ID here.
    appId: '6c99d44d53a0423b94aa699cb4da0f88',
    // Set the channel name.
    channel: 'test',
    // Use a temp token
    token: undefined,
    // Uid
    uid: '123',
  };
  constructor(
    private liveServes: LiveService,
    private spinner: NgxSpinnerService
  ) {}

  async ngOnInit(): Promise<void> {
    this.rtmClint = await AgoraRTM.createInstance(this.options.appId);
    await this.rtmClint.login({
      uid: this.options.uid,
      token: this.options.token,
    });
    this.spinner.show();
    this.liveServes.GetLiveActive().subscribe((res: any) => {
      let all = res;
      let channels: string[] = res.map((x: any) => x.roomName);
      this.rtmClint?.getChannelMemberCount(channels).then((res: any) => {
        this.allChannel = Object.entries(res).map((entry) => {
          return { name: entry[0], count: entry[1] };
        });
        for (let i = 0; i < this.allChannel.length; i++) {
          all.forEach((data: any) => {
            if (this.allChannel[i].name == data.roomName)
              this.AllChannelActive.push({
                data: data,
                channel: this.allChannel[i],
              });
            return null;
          });
        }
      });
      this.spinner.hide();
    });
  }
}
