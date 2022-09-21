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
import { PromoteTypeService } from 'src/app/Service/promote-type.service';

@Component({
  selector: 'app-promote-type',
  templateUrl: './promote-type.component.html',
  styleUrls: ['./promote-type.component.css'],
})
export class PromoteTypeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('_addPromoteTypeTemplate')
  _addPromoteTypeTemplate!: TemplateRef<any>;
  @ViewChild('_editPromoteTypeTemplate')
  _editPromoteTypeTemplate!: TemplateRef<any>;

  @ViewChild('tablePromoteVideoType') tablePromoteVideoType!: ElementRef;

  createPromoteType: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
  });
  constructor(
    private promoteType: PromoteTypeService,
    private dialog: MatDialog,
    private toster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.promoteType.getAllPromoteType().subscribe({
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
  OpenDialogAddPromoteType() {
    this.dialog.open(this._addPromoteTypeTemplate, {
      width: '400px',
      height: '400px',
    });
  }

  AddPromoteType() {
    this.promoteType.InsertPromoteType(this.createPromoteType.value);
    this.createPromoteType.reset();
    this.dialog.closeAll();
  }

  OpenDialogEditPromoteType(data: any) {
    this.createPromoteType.controls['name'].setValue(data.name);
    this.createPromoteType.controls['price'].setValue(data.price);
    this.createPromoteType.addControl(
      'id',
      new FormControl<number>(Number(data.id))
    );
    this.dialog.open(this._editPromoteTypeTemplate, {
      width: '400px',
      height: '400px',
    });
  }

  EditPromoteType() {
    this.promoteType.updatePromoteType(this.createPromoteType.value);
    this.createPromoteType.reset();
    this.dialog.closeAll();
  }

  DeletePromoteType(data:any)
  {
    var valueConfirm = confirm('Ary you Sure');
    if (valueConfirm) {
      this.promoteType.delete(data);
      this.dialog.closeAll();
    }
  }

  generatePdf() {
    html2canvas(this.tablePromoteVideoType.nativeElement).then((canvas) => {
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
