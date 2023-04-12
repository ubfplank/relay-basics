import { graphql, usePaginationFragment } from "react-relay";
import { PostListQuery$key } from "../../../__generated__/PostListQuery.graphql";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "../Loading";
import { PostPaginationQuery } from "../../../__generated__/PostPaginationQuery.graphql";
import { useCallback } from "react";

interface Props {
  query: PostListQuery$key;
}

export default function PostList({ query }: Props) {
  const { data, loadNext, isLoadingNext } = usePaginationFragment<
    PostPaginationQuery,
    PostListQuery$key
  >(
    graphql`
      fragment PostListQuery on Query
      @argumentDefinitions(
        first: { type: Int, defaultValue: 1 }
        after: { type: String }
      )
      @refetchable(queryName: "PostPaginationQuery") {
        posts(first: $first, after: $after)
          @connection(key: "PostList_posts", filters: []) {
          edges {
            node {
              title
            }
          }
          pageInfo {
            hasPreviousPage
            hasNextPage
            startCursor
            endCursor
          }
        }
      }
    `,
    query
  );

  const { posts } = data;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <InfiniteScroll
        pageStart={0}
        loadMore={() => loadNext(1)}
        hasMore={posts.pageInfo.hasNextPage}
        loader={<Loading />}
        useWindow
      >
        <ul>
          {posts.edges?.map(({ node }: any) => (
            <li key={node.id}>{node.title}</li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}
