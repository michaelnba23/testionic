import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RestoComponent } from './resto.component';

describe('RestoComponent', () => {
  let component: RestoComponent;
  let fixture: ComponentFixture<RestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
