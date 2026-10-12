import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("Utils", () => {
  describe("cn", () => {
    it("should merge class names correctly", () => {
      expect(cn("px-4", "py-2")).toBe("px-4 py-2");
    });

    it("should handle conditional classes", () => {
      const includePy2 = false;
      expect(cn("px-4", includePy2 && "py-2")).toBe("px-4");
    });

    it("should handle Tailwind merge conflicts", () => {
      expect(cn("px-4", "px-2")).toBe("px-2");
    });
  });
});
