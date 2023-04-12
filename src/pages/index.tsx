import PostList from "@/components/PostList";
import { Suspense } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { pagesQuery } from "../../__generated__/pagesQuery.graphql";

export default function Home() {
  const query = useLazyLoadQuery<pagesQuery>(
    graphql`
      query pagesQuery {
        ...PostListQuery
      }
    `,
    {}
  );

  return (
    <Suspense fallback={<p>Loading....</p>}>
      <PostList query={query} />
    </Suspense>
  );
}
