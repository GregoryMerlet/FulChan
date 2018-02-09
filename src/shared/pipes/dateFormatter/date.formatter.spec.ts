import {DateFormatter} from "./date.formatter";

describe("DateFormatter", () => {
  it("create an instance", () => {
    const pipe = new DateFormatter();
    expect(pipe).toBeTruthy();
  });
});
