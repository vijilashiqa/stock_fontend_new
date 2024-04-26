import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMenuroleComponent } from './list-menurole.component';

describe('ListMenuroleComponent', () => {
  let component: ListMenuroleComponent;
  let fixture: ComponentFixture<ListMenuroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMenuroleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMenuroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
