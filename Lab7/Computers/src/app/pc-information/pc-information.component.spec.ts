import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcInformationComponent } from './pc-information.component';

describe('PcInformationComponent', () => {
  let component: PcInformationComponent;
  let fixture: ComponentFixture<PcInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PcInformationComponent]
    });
    fixture = TestBed.createComponent(PcInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
