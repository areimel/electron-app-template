import { listNews, openStory } from "../features/news";
import { FEEDS } from "../features/newsModel";
import type { NewsFeed } from "../../shared/ipc/news";
import { handle, type Check } from "./handle";
import { IpcArgError, v } from "./validate";

const request: Check<{ feed: NewsFeed; refresh: boolean }> = (x, at) => {
  if (typeof x !== "object" || x === null) throw new IpcArgError(at, "an object with feed and refresh");
  const o = x as Record<string, unknown>;
  return { feed: v.oneOf(FEEDS)(o.feed, `${at}.feed`), refresh: v.bool(o.refresh, `${at}.refresh`) };
};

export function register(): void {
  handle("news:list", v.args(request), ({ feed, refresh }) => listNews(feed, refresh));
  handle("news:open", v.args(v.int(1, Number.MAX_SAFE_INTEGER), v.oneOf(["article", "comments"] as const)),
    (id, target) => openStory(id, target));
}
