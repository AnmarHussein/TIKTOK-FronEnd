import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { UserProfileService } from 'src/app/Service/user-profile.service';
import { UsersService } from 'src/app/Service/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  userInfo: any;
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
    id: new FormControl(''),
    password: new FormControl(''),
    roleId: new FormControl(''),
    imagePathOld: new FormControl(''),
  });
  constructor(
    private users: UsersService,
    private jwtHelper: JwtHelperService,
    public userProfile: UserProfileService,
    private route: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.userInfo = this.jwtHelper.decodeToken(
      localStorage.getItem('JWTToken')!
    );
    if (!this.userInfo) {
      this.route.navigate(['/home']);
    }
    this.userProfile.GetAllUserCountStatistic(this.userInfo);
    this.patchValueFrom();
    this.spinner.hide();
  }

  patchValueFrom() {
    this.userProfile.GetUser(this.userInfo).subscribe((res: any) => {
      this.editUser.patchValue({
        userName: res.userName,
        email: res.email,
        fullName: res.fullName,
        bDate: res.bDate,
        imagePath: res.imagePath,
        id: res.id,
        title: res.title,
        password: res.password,
        genderId: res.genderId,
        roleId: res.roleId,
        imagePathOld: res.imagePath,
      });
    });
  }
  SaveData() {
    this.users.update(this.editUser.value);
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
}
