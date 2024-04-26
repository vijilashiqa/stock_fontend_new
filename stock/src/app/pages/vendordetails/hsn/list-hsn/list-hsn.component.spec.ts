import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHsnComponent } from './list-hsn.component';

describe('ListHsnComponent', () => {
  let component: ListHsnComponent;
  let fixture: ComponentFixture<ListHsnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHsnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHsnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
