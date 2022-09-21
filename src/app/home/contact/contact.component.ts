import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactUsService } from 'src/app/Service/contact-us.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  createContact: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.min(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required, Validators.min(5)]),
    message: new FormControl('', [Validators.required, Validators.min(5)]),
  });
  constructor(private contact: ContactUsService) {}

  ngOnInit(): void {}

  CreateContact() {
    this.contact.InsertContactUS(this.createContact.value);
    this.createContact.reset();
  }
}
