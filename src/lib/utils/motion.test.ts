import { afterEach, describe, expect, it, vi } from "vitest";
import { prefersReducedMotion } from "./motion";

const stubMatchMedia = (matches: boolean) => {
  vi.stubGlobal("window", {
    matchMedia: () => ({ matches }),
  } as unknown as Window & typeof globalThis);
};

describe("prefersReducedMotion", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("reports no preference where no window exists", () => {
    expect(prefersReducedMotion()).toBe(false);
  });

  it("reflects the media query when a window exists", () => {
    stubMatchMedia(true);
    expect(prefersReducedMotion()).toBe(true);

    stubMatchMedia(false);
    expect(prefersReducedMotion()).toBe(false);
  });
});
