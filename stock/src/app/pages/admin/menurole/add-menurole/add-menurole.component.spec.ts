import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuroleComponent } from './add-menurole.component';

describe('AddMenuroleComponent', () => {
  let component: AddMenuroleComponent;
  let fixture: ComponentFixture<AddMenuroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMenuroleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMenuroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
