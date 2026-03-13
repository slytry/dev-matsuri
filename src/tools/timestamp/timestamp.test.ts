import { describe, expect, it } from "vitest";
import { buildDefaultRange, dateFromUnixInput, estimatePoints, unixFromInput } from "@/tools/timestamp/timestamp";

describe("timestamp utils", () => {
  it("creates midnight defaults", () => {
    const mockDate = new Date(2026, 2, 11, 13, 45, 0, 0);
    const defaults = buildDefaultRange(mockDate);

    expect(defaults.start.endsWith("T00:00")).toBe(true);
    expect(defaults.end.endsWith("T00:00")).toBe(true);
  });

  it("converts datetime value to unix seconds", () => {
    const unix = unixFromInput("2026-03-11T00:00");
    expect(unix).not.toBeNull();
  });

  it("converts unix seconds back to datetime value", () => {
    const source = "2026-03-11T00:00";
    const unix = unixFromInput(source);
    expect(unix).not.toBeNull();
    expect(dateFromUnixInput(String(unix))).toBe(source);
  });

  it("returns null for invalid unix value", () => {
    expect(dateFromUnixInput("12.5")).toBeNull();
  });

  it("estimates range points", () => {
    expect(estimatePoints(0, 120, 60)).toBe(3);
  });
});
