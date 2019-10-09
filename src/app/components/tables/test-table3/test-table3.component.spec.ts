import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTable3Component } from './test-table3.component';

describe('TestTable3Component', () => {
  let component: TestTable3Component;
  let fixture: ComponentFixture<TestTable3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTable3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTable3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
