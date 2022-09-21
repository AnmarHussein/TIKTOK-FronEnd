import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import createAuth0Client from '@auth0/auth0-spa-js';
import { ContactUsService } from 'src/app/Service/contact-us.service';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-sent-mail',
  templateUrl: './sent-mail.component.html',
  styleUrls: ['./sent-mail.component.css'],
})
export class SentMailComponent implements OnInit {
  createContact: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required, Validators.min(5)]),
    message: new FormControl('', [Validators.required, Validators.min(5)]),
  });
  constructor(
    private dataShear: DataService,
    private contact: ContactUsService
  ) {}

  ngOnInit(): void {
    let email = this.dataShear.anyData;
    if (email) {
      this.createContact.controls['email'].setValue(email);
    }
  }

  CreateContact() {
    this.contact.SendEmailWebToUser(this.createContact.value);
    this.createContact.reset();
  }
}
