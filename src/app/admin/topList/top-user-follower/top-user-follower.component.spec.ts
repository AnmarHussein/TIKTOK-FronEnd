import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUserFollowerComponent } from './top-user-follower.component';

describe('TopUserFollowerComponent', () => {
  let component: TopUserFollowerComponent;
  let fixture: ComponentFixture<TopUserFollowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopUserFollowerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopUserFollowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
