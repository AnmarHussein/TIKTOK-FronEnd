import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopVideoLikeComponent } from './top-video-like.component';

describe('TopVideoLikeComponent', () => {
  let component: TopVideoLikeComponent;
  let fixture: ComponentFixture<TopVideoLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopVideoLikeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopVideoLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
