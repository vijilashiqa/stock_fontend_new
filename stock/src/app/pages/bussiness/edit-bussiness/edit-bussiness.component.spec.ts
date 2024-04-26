import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBussinessComponent } from './edit-bussiness.component';

describe('EditBussinessComponent', () => {
  let component: EditBussinessComponent;
  let fixture: ComponentFixture<EditBussinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBussinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
