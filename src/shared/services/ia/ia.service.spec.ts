import { TestBed, inject } from "@angular/core/testing";

import { IaService } from "./ia.service";

describe("IaService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IaService]
    });
  });

  it("should ...", inject([IaService], (service: IaService) => {
    expect(service).toBeTruthy();
  }));
});
