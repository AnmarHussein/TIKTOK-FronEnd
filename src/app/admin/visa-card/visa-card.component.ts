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
import { UsersService } from 'src/app/Service/users.service';
import { VisaCardService } from 'src/app/Service/visa-card.service';

@Component({
  selector: 'app-visa-card',
  templateUrl: './visa-card.component.html',
  styleUrls: ['./visa-card.component.css'],
})
export class VisaCardComponent implements OnInit {
  card: any;
  displayedColumns: string[] = [
    'cardName',
    'cardNumber',
    'expireDate',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('ShowVisaCard') ShowVisaCard!: TemplateRef<any>;
  @ViewChild('_addCardTemplate') _addCardTemplate!: TemplateRef<any>;
  @ViewChild('_editCardTemplate') _editCardTemplate!: TemplateRef<any>;

  @ViewChild('tableVisaCard') tableVisaCard!: ElementRef;

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
    private cardServies: VisaCardService,
    private dialog: MatDialog,
    private toster: ToastrService,
    private spinner: NgxSpinnerService,
    public users: UsersService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.cardServies.getAllVisaCard().subscribe({
      next: (res: any) => {
        this.spinner.hide();
        this.toster.success('Get All Data');
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  OpenDialogAddVisaCard() {
    this.users.getAllUserNameAndId();
    this.dialog.open(this._addCardTemplate, {
      width: '600px',
      height: '400px',
    });
  }

  AddCard() {
    this.cardServies.InsertVisaCard(this.createCard.value);
    this.createCard.reset();
    this.dialog.closeAll();
  }

  OpenDialogShowVisaCard(data: any) {
    this.card = data;
    this.dialog.open(this.ShowVisaCard, {
      width: '400px',
      height: '400px',
    });
  }

  OpenDialogEditCard(data: any) {
    this.users.getAllUserNameAndId();
    this.createCard.controls['cardName'].setValue(data.cardName);
    this.createCard.controls['cardNumber'].setValue(data.cardNumber);
    this.createCard.controls['expireDate'].setValue(data.expireDate);
    this.createCard.controls['securityCode'].setValue(data.securityCode);
    this.createCard.controls['userId'].setValue(data.userId);
    this.createCard.addControl('id', new FormControl<number>(Number(data.id)));
    this.dialog.open(this._editCardTemplate, {
      width: '400px',
      height: '400px',
    });
  }
  EditCard() {
    this.cardServies.updateVisaCard(this.createCard.value);
    this.createCard.reset();
    this.dialog.closeAll();
  }

  DeleteCard(data: any) {
    var valueConfirm = confirm('Ary you Sure');
    if (valueConfirm) {
      this.cardServies.deleteVisaCard(data);
      this.dialog.closeAll();
    }
  }
  generatePdf() {
    html2canvas(this.tableVisaCard.nativeElement).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      pdf.text('Welcom To TikTok All Users !', 100, 20);
      var position = 50;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('users.pdf'); // Generated PDF
    });
  }
}
