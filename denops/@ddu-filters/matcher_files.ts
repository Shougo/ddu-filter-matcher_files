import { BaseFilter, DduItem } from "jsr:@shougo/ddu-vim@^5.0.0/types";

import { type ActionData } from "jsr:@shougo/ddu-kind-file@^0.8.0";

import type { Denops } from "jsr:@denops/core@^7.0.0";

import { globToRegExp } from "jsr:@std/path@1.0.2";

type Params = {
  globs: string[];
  patterns: string[];
};

export class Filter extends BaseFilter<Params> {
  override filter(args: {
    denops: Denops;
    filterParams: Params;
    items: DduItem[];
  }): Promise<DduItem[]> {
    if (
      args.filterParams.patterns.length == 0 &&
      args.filterParams.globs.length == 0
    ) {
      return Promise.resolve(args.items);
    }

    const globs = args.filterParams.globs.map(
      (glob) => globToRegExp("**/" + glob),
    );

    return Promise.resolve(args.items.filter(
      (item) => {
        const action = item.action as ActionData;
        if (!action.path) return false;
        for (const pattern of args.filterParams.patterns) {
          if (action.path.search(pattern) >= 0) {
            return true;
          }
        }
        for (const glob of globs) {
          if (glob.test(action.path)) {
            return true;
          }
        }
        return false;
      },
    ));
  }

  override params(): Params {
    return {
      globs: [],
      patterns: [],
    };
  }
}
