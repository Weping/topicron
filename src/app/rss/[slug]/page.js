import Link from "next/link";

import { getFeedData, getFeedRssData } from "@/lib/rss/parser";
import RssDate from "@/components/rss/date";

export async function generateMetadata({ params }) {
  const feed = await getFeedData(params.slug);

  return {
    title: feed.title,
  };
}

export default async function Feed({ params }) {
  const feed = await getFeedData(params.slug);
  const rss = await getFeedRssData(feed.url);

  return (
    <>
      <h1>{feed.title}</h1>
      <div>
        {rss.items.map((item) => (
          <div key={item.link}>
            <Link href={item.link} target="_blank">
              <div>{item.title}</div>
            </Link>
            <div>
              <RssDate dateString={item.isoDate} />
            </div>
            <hr></hr>
          </div>
        ))}
      </div>
      <div>
        <Link href="/rss">&larr; Back</Link>
      </div>
    </>
  );
}
