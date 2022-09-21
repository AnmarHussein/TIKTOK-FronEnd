import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-top-user-follower',
  templateUrl: './top-user-follower.component.html',
  styleUrls: ['./top-user-follower.component.css']
})
export class TopUserFollowerComponent implements OnInit {

  top5users:any;

  constructor(private admin:AdminService) { }

  ngOnInit(): void {
    this.GetTopFiveFollowerdUser()
  }

  GetTopFiveFollowerdUser()
  {
    this.admin.GetTopFiveFollowerdUser().subscribe((res)=>
    {
      this.top5users = res
    })
  }
}
