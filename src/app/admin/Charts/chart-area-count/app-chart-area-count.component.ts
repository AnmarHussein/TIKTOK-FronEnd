import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/Service/admin.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-chart-area-count',
  templateUrl: './app-chart-area-count.component.html',
  styleUrls: ['./app-chart-area-count.component.css'],
})
export class AppChartAreaCountComponent implements OnInit, OnChanges {
  month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  @Input() tableName?: string;
  tableAndCount: any;
  public chartOptionsArea: Partial<ChartOptions> | any;
  constructor(
    private admin: AdminService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    let data = {
      tablename: this.tableName,
      cloname: 'Id',
      year: new Date().getFullYear().toString(),
    };
    this.admin.GetAlltableCountRow(data).subscribe((res) => {
      this.tableAndCount = res;
    });
    // to get all month  count
    data.cloname = 'createAt';
    this.spinner.show();
    this.admin.GetAllVideoCountInMonth(data).subscribe(
      (res: any) => {
        this.chartOptionsArea = {
          series: [
            {
              name: 'series1',
              data: res.map((r: any) => r.count),
            },
          ],
          chart: {
            height: 200,
            type: 'area',
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
          },
          xaxis: {
            categories: res.map((r: any) => this.month[r.month1 - 1]),
          },
        };
        this.spinner.hide();
      },
      (err) => console.log(err.message)
    );
  }
  ngOnInit(): void {}
}
