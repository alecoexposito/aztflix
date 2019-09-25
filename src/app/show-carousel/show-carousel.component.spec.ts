import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCarouselComponent } from './show-carousel.component';

describe('ShowCarouselComponent', () => {
  let component: ShowCarouselComponent;
  let fixture: ComponentFixture<ShowCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
