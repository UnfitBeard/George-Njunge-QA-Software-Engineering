import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitersProfileEditorComponent } from './recruiters-profile-editor.component';

describe('RecruitersProfileEditorComponent', () => {
  let component: RecruitersProfileEditorComponent;
  let fixture: ComponentFixture<RecruitersProfileEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruitersProfileEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitersProfileEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
