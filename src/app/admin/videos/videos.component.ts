import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { async } from 'rxjs';
import { handelErorr } from 'src/app/model/HandleErorr.model';
import { DataService } from 'src/app/Service/data.service';
import { ProfileService } from 'src/app/Service/profile.service';
import { UsersService } from 'src/app/Service/users.service';
import { VideosService } from 'src/app/Service/videos.service';
import { CommnetComponent } from '../commnet/commnet.component';
import { LikesComponent } from '../likes/likes.component';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent implements OnInit {
  video: any;
  displayedColumns: string[] = [
    'userName',
    'videoPath',
    'title',
    'createAt',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('tableUsersPdf') tableUsersPdf!: ElementRef;

  @ViewChild('openVideoShowTemplate') _openVideoShowTemplate!: TemplateRef<any>;
  @ViewChild('_addVideosTemplate') _addVideosTemplate!: TemplateRef<any>;
  @ViewChild('_EditVideosTemplate') _EditVideosTemplate!: TemplateRef<any>;

  createVideos: FormGroup = new FormGroup({
    title: new FormControl(''),
    posterPath: new FormControl(''),
    videoPath: new FormControl(''),
    userId: new FormControl(''),
  });
  constructor(
    public videoServise: VideosService,
    private dialog: MatDialog,
    private toster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: Router,
    public userServise: UsersService,
    public profile: ProfileService,
    public shearData: DataService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.videoServise.getAll().subscribe(
      (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.toster.error(handelErorr(err.status));
        this.route.navigate(['/auth']);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  OpenShowVidoeDialog(data: any) {
    this.video = [];
    this.video = data;
    this.profile.GetCountReplayVideo(data.id);
    this.profile.GetCountLikeVideo(data.id);

    this.dialog.open(this._openVideoShowTemplate, {
      position: { top: '82px' },
      width: '600px',
      height: '500px',
    });
  }

  OpenDilaogAddVideo() {
    this.userServise.getAllUserNameAndId();
    this.dialog.open(this._addVideosTemplate, {
      position: { top: '82px' },
      width: '600px',
      height: '500px',
    });
  }

  AddVidoe() {
    this.videoServise.Insert(this.createVideos.value);
    this.createVideos.reset();
    this.dialog.closeAll();
  }

  UploadFile(typeFile: number, file: any) {
    if (file.length == 0) {
      return;
    }
    let fileToUploade = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUploade);
    this.videoServise.uploadImage(typeFile, formData);
  }

  OpenDilaogEditVideo(data: any) {
    this.userServise.getAllUserNameAndId();

    this.createVideos.controls['title'].setValue(data.title);
    this.createVideos.controls['userId'].setValue(data.userId);
    this.createVideos.addControl(
      'oldposterPath',
      new FormControl(data.posterPath)
    );
    this.createVideos.addControl(
      'oldvideoPath',
      new FormControl(data.videoPath)
    );
    this.createVideos.addControl(
      'id',
      new FormControl<number>(Number(data.id))
    );
    this.dialog.open(this._EditVideosTemplate, {
      height: '400px',
      width: '600px',
    });
  }

  UpdateVideo() {
    this.videoServise.update(this.createVideos.value);
    this.dialog.closeAll();
    this.createVideos.reset();
  }

  DeleteVideo(data: any) {
    var valueConfirm = confirm('Ary you Sure .. ?');
    if (valueConfirm) {
      this.videoServise.delete(data);
      this.dialog.closeAll();
      window.location.reload();
    }
  }
  BlockVideo(data: any) {
    this.profile.BlockVideoAdmin(data);
  }

  OpenDialogComment(videoid: any) {
    this.dialog.open(CommnetComponent, {
      position: { top: '100px', left: '400px' },
      width: '700px',
      height: '500px',
    });
    this.shearData.anyData = videoid;
  }
  OpenDialogLikes(videoid: any) {
    this.dialog.open(LikesComponent, {
      position: { top: '100px', left: '400px' },
      width: '700px',
      height: '500px',
    });
    this.shearData.anyData = videoid;
  }
}
