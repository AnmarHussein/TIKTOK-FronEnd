import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-count-customer-or-visa-card',
  templateUrl: './count-customer-or-visa-card.component.html',
  styleUrls: ['./count-customer-or-visa-card.component.css'],
})
export class CountCustomerOrVisaCardComponent implements OnInit, OnChanges {
  @Input() tableName?: string;
  name?: string;
  count?: number;
  constructor(private admin: AdminService) {}

  ngOnChanges(changes: SimpleChanges): void {
    let data = {
      tablename: this.tableName,
      cloname: 'Id',
    };
    this.admin.GetAlltableCountRow(data).subscribe((res: any) => {
      this.name = res.name;
      this.count = res.countrow;
    });
  }

  ngOnInit(): void {}
}
