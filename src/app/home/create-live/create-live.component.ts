import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-live',
  templateUrl: './create-live.component.html',
  styleUrls: ['./create-live.component.css'],
})
export class CreateLiveComponent implements OnInit {
  errorLiveName: boolean = false;
  createLive: FormGroup = new FormGroup({
    roomName: new FormControl('', Validators.required),
  });
  constructor(private route: Router) {}

  ngOnInit(): void {}
  GoToLive() {
    let room = this.createLive.controls['roomName'].value;
    this.route.navigate([`live/room/${room}/1`]);
  }
  ShowError() {
    if (this.createLive.controls['roomName'].hasError('required')) {
      this.errorLiveName = true;
    } else {
      this.errorLiveName = false;
    }
  }
}
