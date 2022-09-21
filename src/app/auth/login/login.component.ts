import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  FogetPasswrd: boolean = false;
  checkLength: boolean = false;
  checkChar: boolean = false;
  authForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$'
      ),
    ]),
    genderId: new FormControl('', [Validators.required]),
    bDate: new FormControl('', [Validators.required]),
    imagePath: new FormControl(''),
    title: new FormControl('', [Validators.required]),
  });

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private tostar: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.hide();
  }

  Login() {
    this.auth.GetAuthUSer(this.authForm.value);
    this.dialog.closeAll();
  }
  Rigester() {
    this.auth.Rigester(this.authForm.value);
    this.dialog.closeAll();
  }
  CheckPassWord() {
    let pass = this.authForm.controls['password'].value;
    if (pass.length >= 8 && pass.length <= 20) {
      this.checkLength = true;
    }
    if (pass.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-])')) {
      this.checkChar = true;
    }
  }
  UploadImageUser(file: any) {
    if (file.length == 0) {
      return;
    }
    let fileToUploade = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUploade);
    this.auth.uploadImage(formData);
  }
  ForgetPassWrdShow() {
    this.FogetPasswrd = !this.FogetPasswrd;
  }
  ForgetPasswrd() {
    console.log(this.authForm.controls['email'].value);
    this.auth.SendForgetPassWord({
      email: this.authForm.controls['email'].value,
    });
    this.dialog.closeAll();
  }
}
