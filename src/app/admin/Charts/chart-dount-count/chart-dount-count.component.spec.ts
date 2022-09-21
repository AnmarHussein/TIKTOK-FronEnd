import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDountCountComponent } from './chart-dount-count.component';

describe('ChartDountCountComponent', () => {
  let component: ChartDountCountComponent;
  let fixture: ComponentFixture<ChartDountCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartDountCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartDountCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
