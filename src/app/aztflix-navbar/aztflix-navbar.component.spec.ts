import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AztflixNavbarComponent } from './aztflix-navbar.component';

describe('AztflixNavbarComponent', () => {
  let component: AztflixNavbarComponent;
  let fixture: ComponentFixture<AztflixNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AztflixNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AztflixNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
