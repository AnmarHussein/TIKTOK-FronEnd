import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactUsService } from 'src/app/Service/contact-us.service';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-inbox-sidebar',
  templateUrl: './inbox-sidebar.component.html',
  styleUrls: ['./inbox-sidebar.component.css'],
})
export class InboxSidebarComponent implements OnInit {
  countInbox?: number;
  countImportant?: number;
  constructor(
    private contact: ContactUsService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private shearData: DataService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.contact.GetInboxStatstic().subscribe((res: any) => {
      this.countInbox = res.countInbox;
      this.countImportant = res.countImportant;
      this.spinner.hide();
    });
  }

  RouterToInboxImportaint() {
    this.shearData.updateApprovalMessage('Important');
    this.route.navigate(['admin/ImportantMail']);
  }
  RouterToInboxTrash() {
    this.shearData.updateApprovalMessage('Trash');
    this.route.navigate(['admin/TrashMail']);
  }
}
