import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from 'src/app/Service/data.service';
import { UsersService } from 'src/app/Service/users.service';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css'],
})
export class ProfileAdminComponent implements OnInit {
  @ViewChild('editUserProfile') editUserProfile!: TemplateRef<any>;
  editUser: FormGroup = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    title: new FormControl(''),
    imagePath: new FormControl(''),
    bDate: new FormControl(''),
    genderId: new FormControl(''),
  });

  constructor(public users: UsersService, private dialog: MatDialog,private jwtHelper: JwtHelperService,) {}

  ngOnInit(): void {
    const token = localStorage.getItem('JWTToken')
    if(token !== null)
    this.users.GetUserById(Number(this.jwtHelper.decodeToken(token).id));
  }

  OpenDialogEditUserProfile(row: any) {
    this.editUser.controls['fullName'].setValue(row.fullName);
    this.editUser.controls['userName'].setValue(row.userName);
    this.editUser.controls['email'].setValue(row.email);
    this.editUser.controls['title'].setValue(row.title);
    this.editUser.controls['bDate'].setValue(row.bDate);
    this.editUser.controls['genderId'].setValue(row.genderId);
    this.editUser.addControl('password', new FormControl(row.password));
    this.editUser.addControl('imagePathOld', new FormControl(row.imagePath));
    this.editUser.addControl('id', new FormControl<number>(Number(row.id)));
    this.editUser.addControl(
      'roleId',
      new FormControl<number>(Number(row.roleId))
    );
    this.dialog.open(this.editUserProfile, {
      height: '400px',
      width: '600px',
    });
  }
  UploadImageUser(file: any) {
    if (file.length == 0) {
      return;
    }
    let fileToUploade = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUploade);
    this.users.uploadImage(formData);
  }
  UserEdit() {
    this.users.update(this.editUser.value);
    this.dialog.closeAll();
  }
}
