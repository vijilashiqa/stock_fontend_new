import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListvendorComponent } from './listvendor.component';

describe('ListvendorComponent', () => {
  let component: ListvendorComponent;
  let fixture: ComponentFixture<ListvendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListvendorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListvendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
