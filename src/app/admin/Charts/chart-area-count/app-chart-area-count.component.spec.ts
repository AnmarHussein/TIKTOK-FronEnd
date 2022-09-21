import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppChartAreaCountComponent } from './app-chart-area-count.component';

describe('AppChartAreaCountComponent', () => {
  let component: AppChartAreaCountComponent;
  let fixture: ComponentFixture<AppChartAreaCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppChartAreaCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppChartAreaCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
