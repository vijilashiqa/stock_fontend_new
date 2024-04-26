import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOwnComponent } from './list-own.component';

describe('ListOwnComponent', () => {
  let component: ListOwnComponent;
  let fixture: ComponentFixture<ListOwnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOwnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOwnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
