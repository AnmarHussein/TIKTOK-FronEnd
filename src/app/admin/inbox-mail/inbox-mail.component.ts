import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContactUsService } from 'src/app/Service/contact-us.service';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-inbox-mail',
  templateUrl: './inbox-mail.component.html',
  styleUrls: ['./inbox-mail.component.css'],
})
export class InboxMailComponent implements OnInit {
  AllMail: any = [];
  typePage: any;
  countRead?: number;
  constructor(
    private contact: ContactUsService,
    private toster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private shearData: DataService
  ) {}
  ngOnInit(): void {
    this.shearData.currentApprovalStageMessage.subscribe(
      (res) => (this.typePage = res)
    );
    console.log(this.typePage);
    this.GetAllMail();
  }
  GetAllMail() {
    this.spinner.show();
    this.contact.GetAllContactUS().subscribe(
      (res: any) => {
        if (this.typePage == 'Important') {
          this.AllMail = res.filter(
            (x: any) => x.important == 1 && x.deleteAt == null
          );
        }else if(this.typePage == 'Trash'){
          this.AllMail = res.filter((x: any) => x.deleteAt != null);
        } else {
          this.AllMail = res.filter((x: any) => x.deleteAt == null);
        }

        this.countRead = res.filter((x: any) => x.readEmail == 0).length;
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  importantMail(mailid: number, mailimportant: number) {
    const data = {
      id: mailid,
      important: mailimportant == 1 ? 0 : 1,
    };
    this.contact.importantMailUpdate(data);
  }

  ShowEmail(mail: any) {
    localStorage.setItem('idPage', mail.id);
    this.route.navigate(['/admin/InboxMail/ShowMail']);
  }
}
