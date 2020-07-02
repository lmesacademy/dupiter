import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvDataComponent } from './csv-data.component';

describe('CsvDataComponent', () => {
  let component: CsvDataComponent;
  let fixture: ComponentFixture<CsvDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
