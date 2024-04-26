import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBussinessComponent } from './list-bussiness.component';

describe('ListBussinessComponent', () => {
  let component: ListBussinessComponent;
  let fixture: ComponentFixture<ListBussinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBussinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
