import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("returns empty string for no inputs", () => {
    expect(cn()).toBe("");
  });

  it("merges single string", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("merges multiple strings", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("merges array of class names", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });

  it("handles conditional object (true applies key)", () => {
    expect(cn({ foo: true, bar: false })).toBe("foo");
  });

  it("merges Tailwind-style conflicts (later wins via twMerge)", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
  });
});
