import { Component, Input, OnInit } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { AdminService } from 'src/app/Service/admin.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-chart-dount-count',
  templateUrl: './chart-dount-count.component.html',
  styleUrls: ['./chart-dount-count.component.css'],
})
export class ChartDountCountComponent implements OnInit {
  public chartOptionspie?: Partial<ChartOptions> | any;
  constructor(private admin: AdminService) {}
  ngOnInit(): void {
    this.GetALLGender();
  }

  GetALLGender() {
    this.admin.GetGenderCount().subscribe((res: any) => {
      this.chartOptionspie = {
        series: res.map((r: any) => r.count),
        chart: {
          width: 350,
          type: 'donut',
        },
        labels: res.map((r: any) => r.name),
        theme: {
          monochrome: { enabled: true },
        },
        title: { text: 'Number of Gender' },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: { width: 600 },
              legend: { position: 'top' },
            },
          },
        ],
      };
    });
  }
}
