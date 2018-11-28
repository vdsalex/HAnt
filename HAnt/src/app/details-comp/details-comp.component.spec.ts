import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCompComponent } from './details-comp.component';

describe('DetailsCompComponent', () => {
  let component: DetailsCompComponent;
  let fixture: ComponentFixture<DetailsCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
