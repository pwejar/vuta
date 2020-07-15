import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LighterComponent } from './lighter.component';

describe('LighterComponent', () => {
  let component: LighterComponent;
  let fixture: ComponentFixture<LighterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LighterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LighterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
