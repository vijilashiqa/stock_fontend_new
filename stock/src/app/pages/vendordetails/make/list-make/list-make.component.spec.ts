import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMakeComponent } from './list-make.component';

describe('ListMakeComponent', () => {
  let component: ListMakeComponent;
  let fixture: ComponentFixture<ListMakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMakeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
