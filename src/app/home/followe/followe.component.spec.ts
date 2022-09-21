import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolloweComponent } from './followe.component';

describe('FolloweComponent', () => {
  let component: FolloweComponent;
  let fixture: ComponentFixture<FolloweComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolloweComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FolloweComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
