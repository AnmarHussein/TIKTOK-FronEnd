import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomepageService } from 'src/app/Service/homepage.service';

@Component({
  selector: 'app-home-page-edit',
  templateUrl: './home-page-edit.component.html',
  styleUrls: ['./home-page-edit.component.css'],
})
export class HomePageEditComponent implements OnInit {
  homepage = [];
  editHomePage: FormGroup = new FormGroup({
    id: new FormControl<number>(0),
    captur1: new FormControl(''),
    captur2: new FormControl(''),
    captur3: new FormControl(''),
    button1: new FormControl(''),
    copyRigth: new FormControl(''),
    navButton1: new FormControl('', [Validators.required]),
    navButton2: new FormControl(''),
    pargraf1: new FormControl(''),
    pargraf2: new FormControl(''),
    oldnavLogo: new FormControl(''),
  });
  constructor(private home: HomepageService) {}

  ngOnInit(): void {
    this.home.GetHomePage();
    this.fillData();
  }
  fillData() {
    this.home.GetHomePageSubject().subscribe((res) => {
      this.editHomePage.controls['id'].setValue(Number(res.id));
      this.editHomePage.controls['captur1'].setValue(res.captur1);
      this.editHomePage.controls['captur2'].setValue(res.captur2);
      this.editHomePage.controls['captur3'].setValue(res.captur3);
      this.editHomePage.controls['button1'].setValue(res.button1);
      this.editHomePage.controls['copyRigth'].setValue(res.copyRigth);
      this.editHomePage.controls['navButton1'].setValue(res.navButton1);
      this.editHomePage.controls['navButton2'].setValue(res.navButton2);
      this.editHomePage.controls['pargraf1'].setValue(res.pargraf1);
      this.editHomePage.controls['pargraf2'].setValue(res.pargraf2);
      this.editHomePage.controls['oldnavLogo'].setValue(res.navLogo);
    });
  }
  EditHomePage() {
    this.home.UpdateHomePage(this.editHomePage.value);
  }
  UploadLogoHome(file: any) {
    if (file.length == 0) {
      return;
    }
    let fileToUploade = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUploade);
    this.home.uploadImage(formData);
  }
}
