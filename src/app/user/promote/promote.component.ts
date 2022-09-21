import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Service/data.service';
import { PromoteTypeService } from 'src/app/Service/promote-type.service';
import { UserProfileService } from 'src/app/Service/user-profile.service';
import { VisaCardService } from 'src/app/Service/visa-card.service';

@Component({
  selector: 'app-promote',
  templateUrl: './promote.component.html',
  styleUrls: ['./promote.component.css'],
})
export class PromoteComponent implements OnInit {
  video: any;
  createPromote: FormGroup = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    promoteTypeId: new FormControl('', [Validators.required]),
    cardNumber: new FormControl('', [
      Validators.pattern('^[0-9]{4}([-]?[0-9]{4}){3}$'),
    ]),
    videoId: new FormControl('', [Validators.required]),
    securityCode: new FormControl('', [Validators.required]),
  });

  createCard: FormGroup = new FormGroup({
    cardName: new FormControl('', [Validators.required]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{4}([-]?[0-9]{4}){3}$'),
    ]),
    expireDate: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{2}/[0-9]{4}'),
    ]),
    securityCode: new FormControl(''),
    userId: new FormControl(''),
  });

  constructor(
    private shaerData: DataService,
    private route: Router,
    public promoteType: PromoteTypeService,
    private visaCard: VisaCardService,
    private userProfile: UserProfileService
  ) {}

  ngOnInit(): void {
    if (!this.shaerData.anyData) {
      this.route.navigate(['/user/videos']);
    }
    this.video = this.shaerData.anyData;
    this.promoteType.GetIdAndName();
  }
  TakePrometType(data: any) {
    this.createPromote.controls['videoId'].setValue(Number(this.video.id));
    this.createPromote.controls['amount'].setValue(Number(data.price));
    this.createPromote.controls['promoteTypeId'].setValue(Number(data.id));
  }
  AddPromote() {
    if (this.createPromote.controls['cardNumber'].value == '') {
      this.createCard.controls['userId'].setValue(Number(this.video.userId));

      this.createPromote.controls['cardNumber'].setValue(
        this.createCard.controls['cardNumber'].value
      );
      this.createPromote.controls['securityCode'].setValue(
        this.createCard.controls['securityCode'].value
      );
      // Step 1 Add Card in DataBase
      this.visaCard.InsertVisaCard(this.createCard.value);
      
    }
    this.userProfile.InsertPromote(this.createPromote.value);
    this.route.navigate(['/user/billing']);
  }
}
