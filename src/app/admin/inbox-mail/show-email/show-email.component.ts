import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactUsService } from 'src/app/Service/contact-us.service';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-show-email',
  templateUrl: './show-email.component.html',
  styleUrls: ['./show-email.component.css'],
})
export class ShowEmailComponent implements OnInit, OnDestroy {
  mail: any;
  constructor(
    private contact: ContactUsService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private dataShear: DataService
  ) {}
  ngOnDestroy(): void {
    if (this.mail && this.mail.readEmail == 0) {
      this.contact.ReadEmailUpdate({ id: this.mail.id });
    }
    localStorage.removeItem('idPage');
  }

  ngOnInit(): void {
    let id = Number(localStorage.getItem('idPage'));
    if (id > 0) {
      this.spinner.show();
      this.contact.GetByIdContactUS(id).subscribe((res: any) => {
        this.mail = res;
        this.spinner.hide();
      });
    } else {
      this.route.navigate(['/admin/InboxMail']);
    }
  }

  importantMail(mailid: number, mailimportant: number) {
    const data = {
      id: mailid,
      important: mailimportant == 1 ? 0 : 1,
    };
    this.contact.importantMailUpdate(data);
  }
  TrashMailUpdate(mail: any) {
    this.contact.TrashMailUpdate({ id: mail.id });
  }
  RemoverTrashMailUpdate(mail: any) {
    this.contact.RemoverTrashMailUpdate({ id: mail.id });
  }
  RouteToSentEmail(mail: any) {
    this.dataShear.anyData = mail.email;
    this.route.navigate(['admin/InboxMail/SentEmail']);
  }
}
