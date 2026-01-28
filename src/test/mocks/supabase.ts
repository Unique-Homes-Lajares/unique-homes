import { vi } from "vitest";

export const mockInvoke = vi.fn();

export const supabase = {
  functions: {
    invoke: (...args: unknown[]) => mockInvoke(...args),
  },
};
