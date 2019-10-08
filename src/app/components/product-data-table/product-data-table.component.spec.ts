import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDataTableComponent } from './product-data-table.component';

describe('ProductDataTableComponent', () => {
  let component: ProductDataTableComponent;
  let fixture: ComponentFixture<ProductDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
