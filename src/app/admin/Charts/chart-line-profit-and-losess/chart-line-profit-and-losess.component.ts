import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/Service/admin.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-chart-line-profit-and-losess',
  templateUrl: './chart-line-profit-and-losess.component.html',
  styleUrls: ['./chart-line-profit-and-losess.component.css'],
})
export class ChartLineProfitAndLosessComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptionsline!: Partial<ChartOptions> | any;
  constructor(
    private admin: AdminService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.GetSelaesPromote();
  }

  GetSelaesPromote() {
    this.spinner.show();
    this.admin.GetSelaesPromote().subscribe((res: any) => {
      this.chartOptionsline = {
        title: { text: 'Promotion Video In Year ' },
        chart: { height: 350, type: 'line', stacked: false },
        dataLabels: { enabled: false },
        colors: ['#343a40'],
        series: [
          {
            name: 'Seales',
            data: res?.map((r: any) => r.countSeales),
          },
        ],
        stroke: { width: [4, 4], curve: 'smooth' },
        plotOptions: { bar: { columnWidth: '20%' } },
        xaxis: { categories: res?.map((r: any) => r.years) },
        tooltip: {
          shared: false,
          intersect: true,
          x: {
            show: false,
          },
        },
        legend: {
          horizontalAlign: 'left',
          offsetX: 40,
        },
      };
    });
    this.spinner.hide();
  }
}
