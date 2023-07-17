import {
  BaseFilter,
  DduItem,
} from "https://deno.land/x/ddu_vim@v3.4.2/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v3.4.2/deps.ts";
import { ActionData } from "https://deno.land/x/ddu_kind_file@v0.5.3/file.ts";
import { globToRegExp } from "https://deno.land/std@0.194.0/path/glob.ts";

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
