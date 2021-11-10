import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocatairePage } from './locataire.page';

describe('LocatairePage', () => {
  let component: LocatairePage;
  let fixture: ComponentFixture<LocatairePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocatairePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocatairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
