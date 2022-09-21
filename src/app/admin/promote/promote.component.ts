import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';
import { ContactUsService } from 'src/app/Service/contact-us.service';
import { PromoteTypeService } from 'src/app/Service/promote-type.service';
import { PromoteService } from 'src/app/Service/promote.service';
import { VideosService } from 'src/app/Service/videos.service';
import { VisaCardService } from 'src/app/Service/visa-card.service';

@Component({
  selector: 'app-promote',
  templateUrl: './promote.component.html',
  styleUrls: ['./promote.component.css'],
})
export class PromoteComponent implements OnInit {
  @ViewChild('templatePdfInvoice')
  _templateInvoice!: ElementRef;
  promotion?: any;
  TotalSeales?: any;
  reports = false;
  displayedColumns: string[] = [
    'title',
    'cardNumber',
    'name',
    'createAt',
    'amount',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('_addPromoteTemplate') _addPromoteTemplate!: TemplateRef<any>;
  @ViewChild('_editPromoteTypeTemplate')
  _editPromoteTemplate!: TemplateRef<any>;

  createPromote: FormGroup = new FormGroup({
    videoId: new FormControl('', Validators.required),
    cardId: new FormControl('', Validators.required),
    promoteTypeId: new FormControl('', Validators.required),
    amount: new FormControl(''),
  });

  @ViewChild('tablePromoteVideo') tablePromoteVideo!: ElementRef;
  constructor(
    private promote: PromoteService,
    private dialog: MatDialog,
    private toster: ToastrService,
    private spinner: NgxSpinnerService,
    private contact: ContactUsService,
    private auth: AuthService,
    // To Get In Insert data
    public videoServies: VideosService,
    public cardServies: VisaCardService,
    public promoteTypeServies: PromoteTypeService
  ) {}

  ngOnInit(): void {
    this.createPromote.controls['amount'].disabled;
    this.spinner.show();
    this.promote.GetAllPromoteInner().subscribe({
      next: (res: any) => {
        this.promotion = res;
        this.TotalSeales = res
          .map((x: any) => x.amount)
          .reduce((a: any, b: any) => a + b);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator;
    }
  }

  OpenDialogAddPromote() {
    this.videoServies.GetIdAndPosterAndTitle();
    this.promoteTypeServies.GetIdAndName();
    this.cardServies.GetIdAndCardNumberAndCardName();

    this.dialog.open(this._addPromoteTemplate, {
      width: '400px',
      height: '400px',
    });
  }
  AddPromote() {
    this.promote.InsertPromote(this.createPromote.value);
    this.createPromote.reset();
  }

  ShowReportPdf() {
    this.reports = !this.reports;
  }
  generatePdf1(type: number) {
    html2canvas(this._templateInvoice.nativeElement!).then((canvas) => {
      // Few necessary setting options
      let HTML_Width = canvas.width;
      let HTML_Height = canvas.height;
      let top_left_margin = 15;
      let PDF_Width = HTML_Width + top_left_margin * 2;
      let PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
      let canvas_image_width = HTML_Width;
      let canvas_image_height = HTML_Height;
      let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
      canvas.getContext('2d');
      let imgData = canvas.toDataURL('image/png', 1.0);
      let pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(
        imgData,
        'png',
        top_left_margin,
        top_left_margin,
        canvas_image_width,
        canvas_image_height
      );
      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage([PDF_Width, PDF_Height], 'p');
        pdf.addImage(
          imgData,
          'png',
          top_left_margin,
          -(PDF_Height * i) + top_left_margin * 4,
          canvas_image_width,
          canvas_image_height
        );
      }
      if (type == 1) {
        window.open(pdf.output('bloburl'));
      } else if (type == 2) {
        pdf.save('ReportsPromotion.pdf');
      } else if (type == 3) {
        const formData = new FormData();
        let file = pdf.output('blob');
        formData.append('file', file);
        formData.append('model', this.auth.GetUserToken().Email);
        this.contact.SendEmailPdf(1, formData);
      }
    });
  }

  TakePrice(event: any) {
    var prtype = this.promoteTypeServies.promoteTypeToSelect.filter(
      (x: any) => x.id == event.value
    )[0];
    this.createPromote.controls['amount'].setValue(Number(prtype.price));
  }

  OpenDialogEditPromote(data: any) {
    this.videoServies.GetIdAndPosterAndTitle();
    this.promoteTypeServies.GetIdAndName();
    this.cardServies.GetIdAndCardNumberAndCardName();

    this.createPromote.controls['videoId'].setValue(data.videoId);
    this.createPromote.controls['cardId'].setValue(data.cardId);
    this.createPromote.controls['promoteTypeId'].setValue(data.promoteTypeId);
    this.createPromote.controls['amount'].setValue(data.amount);
    this.createPromote.addControl(
      'id',
      new FormControl<number>(Number(data.id))
    );
    this.createPromote.addControl('createAt', new FormControl(data.createAt));

    this.dialog.open(this._editPromoteTemplate, {
      width: '400px',
      height: '400px',
    });
  }

  EditPromote() {
    this.promote.updatePromote(this.createPromote.value);
    this.createPromote.reset();
  }
  DeletePromote(data: any) {
    var valueConfirm = confirm('Ary you Sure');
    if (valueConfirm) {
      this.promote.delete(data);
      this.dialog.closeAll();
    }
  }
}
