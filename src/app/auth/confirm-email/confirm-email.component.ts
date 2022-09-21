import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css'],
})
export class ConfirmEmailComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private route1: Router
  ) {}

  ngOnInit(): void {
    let token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.auth.ConfirmEmail({ token: token });
      this.route1.navigate(['/home']);
    }
  }
}
