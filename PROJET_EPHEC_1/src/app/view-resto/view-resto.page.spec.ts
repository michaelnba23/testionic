import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewRestoPage } from './view-resto.page';

describe('ViewRestoPage', () => {
  let component: ViewRestoPage;
  let fixture: ComponentFixture<ViewRestoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRestoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewRestoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
