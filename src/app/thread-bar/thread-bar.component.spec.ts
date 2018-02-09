import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ThreadBarComponent } from "./thread-bar.component";

describe("ThreadBarComponent", () => {
  let component: ThreadBarComponent;
  let fixture: ComponentFixture<ThreadBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
