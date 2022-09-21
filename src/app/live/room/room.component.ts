import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import AgoraRTM, { RtmChannel, RtmClient } from 'agora-rtm-sdk';
import { async, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';
import { LiveService } from 'src/app/Service/live.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit, OnDestroy {
  RoomName: any;
  typeLive: any;
  userId: any;
  totalMember: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  MemberCount: number = 0;
  rtmClint?: RtmClient;
  channel?: RtmChannel;
  nameCur: string = '';
  createMessage: FormGroup = new FormGroup({
    message: new FormControl(''),
  });
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
    private routeActivat: ActivatedRoute,
    private auth: AuthService,
    private route: Router,
    private liveServes: LiveService
  ) {}
  async ngOnDestroy(): Promise<void> {
    await this.leaveCannel();
  }

  async ngOnInit(): Promise<void> {
    //get Data Here
    this.RoomName = this.routeActivat.snapshot.paramMap.get('RoomName');
    this.typeLive = this.routeActivat.snapshot.paramMap.get('type');

    if (!this.auth.isUserAuthntication() && this.typeLive == 1) {
      this.route.navigate(['/home']);
    } else {
      let name = 'Anonymous';
      this.userId = String(Math.floor(Math.random() * 1000));
      if (this.auth.isUserAuthntication()) {
        let user = this.auth.GetUserToken();
        name = user.userName;
        this.userId = user.id;
      }
      if (this.auth.isUserAuthntication() && this.typeLive == 1) {
        this.liveServes.AddLive({
          userId: Number(this.userId),
          roomName: this.RoomName,
        });
      }
      this.nameCur = name;
      this.options.channel = this.RoomName;
      this.options.uid = this.userId;

      this.rtmClint = await AgoraRTM.createInstance(this.options.appId);
      await this.rtmClint.login({
        uid: this.options.uid,
        token: this.options.token,
      });

      await this.rtmClint.addOrUpdateLocalUserAttributes({ name: name });

      this.channel = await this.rtmClint.createChannel(this.options.channel);
      await this.channel.join();

      await this.GetAllMemebers();
      await this.channel.on('MemberJoined', async (MemberId) => {
        await this.AddMember(MemberId);
        await this.updateTotalMember(await this.channel?.getMembers());
      });

      await this.channel?.on('MemberLeft', async (MemberId) => {
        let memberSec = document.getElementById(`member__${MemberId}__wrapper`);
        let leftName =
          memberSec?.getElementsByClassName('member_name')[0].textContent;
        await this.AddBotMessage(` ${leftName} ! has left In The Live`);
        memberSec?.remove();
        await this.updateTotalMember(await this.channel?.getMembers());
      });

      await this.channel?.on(
        'ChannelMessage',
        async (messageData, MemberId) => {
          console.log('sendMessage');
          let msg = messageData.text;
          let data;
          if (msg) {
            data = JSON.parse(msg);
          }
          if (data.type === 'chat') {
            await this.AddMessage(data.message, data.name);
          }
        }
      );
    }
  }
  AddMember = async (MemberId: any) => {
    let { name } = await this.rtmClint!.getUserAttributesByKeys(MemberId, [
      'name',
    ]);

    let listmember = document.getElementById('member__list');
    let addmember = `<div class="member__wrapper"style="transform: rotate(180dge);" id="member__${MemberId}__wrapper">
                      <span class="green__icon"></span>
                      <p class="member_name">${name}</p>
                    </div>`;
    await this.AddBotMessage(`Welcom To The Live ${name} ! 👋`);
    listmember?.insertAdjacentHTML('beforeend', addmember);
  };

  updateTotalMember = async (members: any) => {
    this.totalMember.next(members.length);
  };

  GetAllMemebers = async () => {
    let membrs = await this.channel?.getMembers();
    await this.updateTotalMember(await this.channel?.getMembers());
    if (membrs?.length)
      for (let i = 0; i < membrs?.length; i++) {
        this.AddMember(membrs[i]);
      }
  };

  AddMessage = async (message: any, name: any) => {
    let Allmessages = document.getElementById('messages');
    let newMessage = `<div class="message__wrapper">
                        <div class="message__body">
                          <strong class="message__author">${name}</strong>
                          <p class="message__text">${message}</p>
                        </div>
                      </div>`;
    Allmessages?.insertAdjacentHTML('beforeend', newMessage);
    let lastMessage = document.querySelector(
      '#messages .message__wrapper:last-child'
    );
    if (lastMessage) {
      lastMessage.scrollIntoView();
    }
  };
  AddBotMessage = async (botmessage: any) => {
    let Allmessages = document.getElementById('messages');
    let newMessage = ` <div class="message__wrapper">
                          <div class="message__body__bot">
                            <strong class="message__author__bot">🤖 Tiktok Bot</strong>
                            <p class="message__text__bot">
                              ${botmessage}
                            </p>
                          </div>
                        </div> `;
    Allmessages?.insertAdjacentHTML('beforeend', newMessage);
    let lastMessage = document.querySelector(
      '#messages .message__wrapper:last-child'
    );
    if (lastMessage) {
      lastMessage.scrollIntoView();
    }
  };

  SnedMessage = async () => {
    console.log('Message Form');
    let message = this.createMessage.controls['message'].value;
    await this.channel!.sendMessage({
      text: JSON.stringify({
        type: 'chat',
        message: message,
        name: this.nameCur,
      }),
    });
    await this.AddMessage(message, this.nameCur);
    this.createMessage.reset();
  };

  leaveCannel = async () => {
    if (this.typeLive == 1) {
      this.liveServes.EndLive({ userId: Number(this.userId) });
      this.channel?.removeAllListeners();
    }
  
    this.channel?.leave();
    this.rtmClint?.logout();
    

  };
}
