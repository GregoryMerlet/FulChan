import { TestBed, inject } from "@angular/core/testing";

import { ActualThreadService } from "./actualThread.service";

describe("ActualThreadService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActualThreadService]
    });
  });

  it("should ...", inject([ActualThreadService], (service: ActualThreadService) => {
    expect(service).toBeTruthy();
  }));
});
