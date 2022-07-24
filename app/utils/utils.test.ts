import { safeRedirect, validateEmail } from "./utils";

describe("safeRedirect()", () => {
  it.each([undefined, null])(
    "should return the default redirect if the 'to' is %s",
    (input) => {
      expect(safeRedirect(input, "/")).toBe("/");
    }
  );

  it("should return the default redirect if the 'to' is unsafe", () => {
    expect(safeRedirect("//", "/")).toBe("/");
  });

  it("should return the 'to' if it is safe", () => {
    expect(safeRedirect("/something", "/")).toBe("/something");
  });
});

describe("validateEmail()", () => {
  it("should returns false for non-emails", () => {
    expect(validateEmail(undefined)).toBe(false);
    expect(validateEmail(null)).toBe(false);
    expect(validateEmail("")).toBe(false);
    expect(validateEmail("not-an-email")).toBe(false);
    expect(validateEmail("n@")).toBe(false);
  });

  it("should returns true for emails", () => {
    expect(validateEmail("kody@example.com")).toBe(true);
  });
});
