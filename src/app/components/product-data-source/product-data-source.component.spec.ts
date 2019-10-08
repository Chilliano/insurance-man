import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDataSourceComponent } from './product-data-source.component';

describe('ProductDataSourceComponent', () => {
  let component: ProductDataSourceComponent;
  let fixture: ComponentFixture<ProductDataSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDataSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDataSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
