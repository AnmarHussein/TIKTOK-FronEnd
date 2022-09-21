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
import { UsersService } from 'src/app/Service/users.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Service/data.service';
import { handelErorr } from 'src/app/model/HandleErorr.model';
import { ProfileService } from 'src/app/Service/profile.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'fullName',
    'userName',
    'email',
    'bDate',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('AddTemplate') AddTemplate!: TemplateRef<any>;
  @ViewChild('EditTemplate') EditTemplate!: TemplateRef<any>;
  @ViewChild('tableUsersPdf') tableUsersPdf!: ElementRef;

  createUser: FormGroup = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    title: new FormControl(''),
    imagePath: new FormControl(''),
    bDate: new FormControl(''),
    genderId: new FormControl(''),
  });
  constructor(
    public users1: UsersService,
    private dialog: MatDialog,
    private toster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private dataSharing: DataService,
    private profile: ProfileService
  ) {
    this.UsersGetAll();
  }

  ngOnInit(): void {}

  UsersGetAll() {
    this.spinner.show();
    this.users1.getAll().subscribe(
      (res: any) => {
        this.spinner.hide();
        this.toster.success('Get All Data');
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.spinner.hide();
        this.toster.error(handelErorr(err.status));
        this.route.navigate(['auth']);
      }
    );
  }

  UserInsert() {
    this.users1.Insert(this.createUser.value);
    this.dialog.closeAll();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  OpenDialogAddUser() {
    this.createUser.reset();

    this.dialog.open(this.AddTemplate, {
      height: '400px',
      width: '600px',
    });
  }
  OpenDialogEditUser(row: any) {
    this.createUser.controls['fullName'].setValue(row.fullName);
    this.createUser.controls['userName'].setValue(row.userName);
    this.createUser.controls['email'].setValue(row.email);
    this.createUser.controls['title'].setValue(row.title);
    this.createUser.controls['bDate'].setValue(row.bDate);
    this.createUser.controls['genderId'].setValue(row.genderId);
    this.createUser.controls['password'].setValue(row.password);
    this.createUser.addControl('imagePathOld', new FormControl(row.imagePath));
    this.createUser.addControl('id', new FormControl<number>(Number(row.id)));
    this.createUser.addControl(
      'roleId',
      new FormControl<number>(Number(row.roleId))
    );
    this.dialog.open(this.EditTemplate, {
      height: '400px',
      width: '600px',
      data: row,
    });
  }

  UserEdit() {
    this.users1.update(this.createUser.value);
    this.dialog.closeAll();
  }

  UserDelete(data: any) {
    var valueConfirm = confirm('Ary you Sure');
    if (valueConfirm) {
      this.users1.delete(data);
      this.dialog.closeAll();
    }
  }

  UploadImageUser(file: any) {
    if (file.length == 0) {
      return;
    }
    let fileToUploade = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUploade);
    this.users1.uploadImage(formData);
  }
  generatePdf() {
    html2canvas(this.tableUsersPdf.nativeElement).then((canvas) => {
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

  RedirectShowProfile(data: any) {
    this.route.navigate(['/admin/profileUsers']);
    this.dataSharing._anyData = data;
  }
  BlockUser(data: any) {
    this.profile.BlockUserAdmin(data);
  }
}
