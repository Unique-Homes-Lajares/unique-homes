declare module "lovable-tagger" {
  import type { Plugin } from "vite";
  export function componentTagger(options?: {
    jsxSource?: boolean;
    tailwindConfig?: boolean;
    virtualOverrides?: boolean;
    debug?: boolean;
  }): Plugin;
}
