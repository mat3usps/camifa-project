import { plural } from "./stringUtils";

describe("plural()", () => {
  it("should return zero using countFrom as a number", () => {
    expect(
      plural({ countFrom: 0, one: "one", other: "other", zero: "zero" })
    ).toBe("zero");
  });

  it("should return zero using countFrom as an Array", () => {
    expect(
      plural({ countFrom: [], one: "one", other: "other", zero: "zero" })
    ).toBe("zero");
  });

  it("should return one using countFrom as a number", () => {
    expect(plural({ countFrom: 1, one: "one", other: "other" })).toBe("one");
  });

  it("should return one using countFrom as an Array with just one item", () => {
    expect(
      plural({ countFrom: ["first Item"], one: "one", other: "other" })
    ).toBe("one");
  });

  it("should return one if count is zero and zero isn't defined", () => {
    expect(plural({ countFrom: 0, one: "one", other: "other" })).toBe("one");
  });

  it("should return other using countFrom as a number", () => {
    expect(plural({ countFrom: 3, one: "one", other: "other" })).toBe("other");
  });

  it("should return other using countFrom as an Array with more than one item", () => {
    expect(
      plural({
        countFrom: ["first Item", "second item"],
        one: "one",
        other: "other",
      })
    ).toBe("other");
  });
});
