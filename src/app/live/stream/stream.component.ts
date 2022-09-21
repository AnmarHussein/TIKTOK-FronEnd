import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css'],
})
export class StreamComponent implements OnInit,OnDestroy {
  @Output("leaveCannel") leaveCannel: EventEmitter<any> = new EventEmitter();
  @Input() userId: any;
  @Input() RoomName: any;
  @Input() typeLive: any;
  rtc: any = {
    // For the local audio and video tracks.
    localAudioTrack: null,
    localVideoTrack: null,
    client: null,
  };

  options = {
    // Pass your app ID here.
    appId: '6c99d44d53a0423b94aa699cb4da0f88',
    // Set the channel name.
    channel: 'test',
    // Use a temp token
    token: null,
    // Uid
    uid: '123',
  };
  constructor(private auth: AuthService, private route: Router) {}
  async ngOnDestroy(): Promise<void> {
    await this.LeaveRoom();
  }


  async ngOnInit(): Promise<void> {
    this.options.channel = this.RoomName;
    this.options.uid = this.userId;

    if (this.typeLive == 1 && this.auth.isUserAuthntication()) {
      this.rtc.client = await AgoraRTC.createClient({
        mode: 'live',
        codec: 'vp8',
      });
      await this.onJoinHost();
    } else if (this.typeLive == 2) {
      this.rtc.client = await AgoraRTC.createClient({
        mode: 'live',
        codec: 'vp8',
      });
      await this.JoinAudience();
    } else {
      this.route.navigate(['/home']);
    }
  }

  async onJoinHost() {
    this.rtc.client.setClientRole('host');
    await this.rtc.client.join(
      this.options.appId,
      this.options.channel,
      this.options.token,
      this.options.uid
    );
    // Create an audio track from the audio sampled by a microphone.
    this.rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // Create a video track from the video captured by a camera.
    this.rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
      encoderConfig: {
        width: { min: 640, ideal: 1920, max: 1920 },
        height: { min: 480, ideal: 1080, max: 1080 },
      },
    });
    // Publish the local audio and video tracks to the channel.
    await this.rtc.client.publish([
      this.rtc.localAudioTrack,
      this.rtc.localVideoTrack,
    ]);
    // Dynamically create a container in the form of a DIV element for playing the remote video track.
    let localPlayerContainer = document.getElementById('user__container_1');

    // Specify the ID of the DIV container. You can use the `uid` of the remote user.
    this.rtc.localVideoTrack.play(localPlayerContainer);
  }

  async JoinAudience() {
    this.rtc.client.setClientRole('audience');
    await this.rtc.client.join(
      this.options.appId,
      this.options.channel,
      this.options.token,
      this.options.uid
    );
    this.rtc.client.on('user-published', async (user: any, mediaType: any) => {
      // Subscribe to a remote user.
      await this.rtc.client.subscribe(user, mediaType);
      console.log('subscribe success');

      // If the subscribed track is video.
      if (mediaType === 'video') {
        // Get `RemoteVideoTrack` in the `user` object.
        const remoteVideoTrack = user.videoTrack;
        // Dynamically create a container in the form of a DIV element for playing the remote video track.
        const remotePlayerContainer =
          document.getElementById('user__container_1');

        // Play the remote video track.
        // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
        remoteVideoTrack.play(remotePlayerContainer);
      }

      // If the subscribed track is audio.
      if (mediaType === 'audio') {
        // Get `RemoteAudioTrack` in the `user` object.
        const remoteAudioTrack = user.audioTrack;
        // Play the audio track. No need to pass any DOM element.
        remoteAudioTrack.play();
      }
    });

    this.rtc.client.on('user-unpublished', (user: any) => {
      // Get the dynamically created DIV container.
      const remotePlayerContainer = document.getElementById(user.uid);
      // Destroy the container.
      remotePlayerContainer!.remove();
    });
    this.rtc.client.on('user-left', (user: any) => {
      delete this.rtc.client.remoteUsers[user.uid];
      document.getElementById('user__container_1')?.remove();
    });
  }

  async LeaveRoom() {
    this.leaveCannel.emit();
    // Close all the local tracks.
    this.rtc.localAudioTrack.close();
    this.rtc.localVideoTrack.close();
    // Traverse all remote users.
    this.rtc.client.remoteUsers.forEach((user: any) => {
      // Destroy the dynamically created DIV containers.
      const playerContainer = document.getElementById(user.uid);
      playerContainer && playerContainer!.remove();
    });
    // Leave the channel.
    await this.rtc.client.leave();
    this.route.navigate(['/home']);
  }

  async StopCamera(event: Event) {
    let btn = event.currentTarget;

    if (this.rtc.localVideoTrack.muted) {
      await this.rtc.localVideoTrack.setMuted(false);
      document.getElementById('btn-camera')!.classList.add('active');
    } else {
      await this.rtc.localVideoTrack.setMuted(true);
      document.getElementById('btn-camera')!.classList.remove('active');
    }
  }
  async StopMic(event: Event) {
    let btn = event.currentTarget;

    if (this.rtc.localAudioTrack.muted) {
      await this.rtc.localAudioTrack.setMuted(false);
      document.getElementById('btn-mic')!.classList.add('active');
    } else {
      await this.rtc.localAudioTrack.setMuted(true);
      document.getElementById('btn-mic')!.classList.remove('active');
    }
  }
}
