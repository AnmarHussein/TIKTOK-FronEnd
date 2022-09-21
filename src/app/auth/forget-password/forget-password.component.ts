import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  token: any;
  checkLength: boolean = false;
  checkChar: boolean = false;
  checkRePass: boolean = true;
  createForget: FormGroup = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$'
      ),
    ]),
    reNewPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$'
      ),
    ]),
  });
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private route1: Router,
    private toster: ToastrService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    console.log(this.token);
    if (!this.token) {
      this.toster.error('Cant Show This PAssord');
      this.route1.navigate(['/home']);
    }
  }

  CheckPassWord() {
    let pass = this.createForget.controls['newPassword'].value;
    if (pass.length >= 8 && pass.length <= 20) {
      this.checkLength = true;
    }
    if (pass.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-])')) {
      this.checkChar = true;
    }
  }
  ForgetPassWord() {
    let data = {
      newPassword: this.createForget.controls['newPassword'].value,
      token: this.token,
    };
    this.auth.ForgetPassWord(data);
    this.route1.navigate(['/home']);
  }
  CheckRePassWord() {
    let newPass = this.createForget.controls['newPassword'].value;
    let rePass = this.createForget.controls['reNewPassword'].value;
    if (rePass !== newPass || rePass.length !== newPass.length) {
      this.checkRePass = false;
    } else {
      this.checkRePass = true;
    }
  }
}
