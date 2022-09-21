import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ContactUsService } from 'src/app/Service/contact-us.service';
import { DataService } from 'src/app/Service/data.service';
import { UserProfileService } from 'src/app/Service/user-profile.service';
import { VisaCardService } from 'src/app/Service/visa-card.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
})
export class BillingComponent implements OnInit {
  @ViewChild('templatePdfInvoice')
  _templateInvoice!: ElementRef;
  ShowPdfInvoice = true;
  promote: any;
  @ViewChild('_addCardTemplate') _addCardTemplate!: TemplateRef<any>;
  @ViewChild('_editCardTemplate') _editCardTemplate!: TemplateRef<any>;
  user: any;
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
    public userProfile: UserProfileService,
    private jwtHellper: JwtHelperService,
    private dialog: MatDialog,
    private cardServis: VisaCardService,
    private contact: ContactUsService,
    private SearData: DataService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.user = this.jwtHellper.decodeToken(localStorage.getItem('JWTToken')!);
    this.userProfile.GetVisaCardCountSumSaeles(this.user);
    this.userProfile.GetVisaCardByUser(this.user);
    this.userProfile.GetAllPromotVideoByUser(this.user);
  }
  OpenDialogAddVisaCard() {
    this.dialog.open(this._addCardTemplate, {
      width: '450px',
      height: '500px',
    });
  }

  AddCard() {
    this.createCard.controls['userId'].setValue(Number(this.user.id));
    this.cardServis.InsertVisaCard(this.createCard.value);
    this.createCard.reset();
    this.dialog.closeAll();
  }
  OpenDialogEditCard(data: any) {
    this.createCard.controls['cardName'].setValue(data.cardName);
    this.createCard.controls['cardNumber'].setValue(data.cardNumber);
    this.createCard.controls['expireDate'].setValue(data.expireDate);
    this.createCard.controls['securityCode'].setValue(data.securityCode);
    this.createCard.controls['userId'].setValue(data.userId);
    this.createCard.addControl('id', new FormControl<number>(Number(data.id)));
    this.dialog.open(this._editCardTemplate, {
      width: '400px',
      height: '500px',
    });
  }
  EditCard() {
    this.cardServis.updateVisaCard(this.createCard.value);
    this.createCard.reset();
    this.dialog.closeAll();
  }

  InvoiceTemplate(promot: any) {
    this.ShowPdfInvoice = true;
    this.promote = promot;
    // After Function scroller to invoce
  }

  generatePdf(type: number) {
    html2canvas(this._templateInvoice.nativeElement!).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 200;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      pdf.addImage(contentDataURL, 'PNG', 5, 10, imgWidth, imgHeight);
      if (type == 1) {
        window.open(pdf.output('bloburl'));
      } else if (type == 2) {
        pdf.save('Invoice.pdf');
      } else if (type == 3) {
        const formData = new FormData();
        let file = pdf.output('blob');
        formData.append('file', file);
        formData.append('model', this.user.Email);
        this.contact.SendEmailPdf(2, formData);
      }
    });
  }
}
