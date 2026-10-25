import { jetbrainsMono } from "@/lib/fonts";
import { formatPostDate, getReadingTime } from "@/lib/post-meta";
import type { Post } from "@/lib/blog-utils";

export default function PostMeta({ post }: { post: Post }) {
  return (
    <p
      className={`${jetbrainsMono.className} flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.12em] text-[var(--am-text-muted)]`}
    >
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{getReadingTime(post.content)}</span>
      {post.tags?.[0] ? (
        <span className="ml-1 rounded-full bg-[var(--am-accent-soft)] px-2.5 py-[3px] normal-case tracking-normal text-[var(--am-accent)]">
          {post.tags[0]}
        </span>
      ) : null}
    </p>
  );
}
