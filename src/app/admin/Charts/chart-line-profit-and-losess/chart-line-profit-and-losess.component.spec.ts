import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLineProfitAndLosessComponent } from './chart-line-profit-and-losess.component';

describe('ChartLineProfitAndLosessComponent', () => {
  let component: ChartLineProfitAndLosessComponent;
  let fixture: ComponentFixture<ChartLineProfitAndLosessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartLineProfitAndLosessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartLineProfitAndLosessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
