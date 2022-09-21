import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-top-video-like',
  templateUrl: './top-video-like.component.html',
  styleUrls: ['./top-video-like.component.css']
})
export class TopVideoLikeComponent implements OnInit {

  video5list:any;
  constructor(private admin:AdminService) { }

  ngOnInit(): void {
    this.GetTopFivelikevideo()
  }

  GetTopFivelikevideo()
  {
    this.admin.GetTopFivelikevideo().subscribe((res)=>{
      this.video5list = res;
    })
  }
}
