import { useQuery } from "@apollo/client";
import { Alert, Card, Divider, List, Radio, Skeleton, Typography } from "antd";
import { memo, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { donationsQUery } from "../../graphql/queries";
import { IDonation, IPaginateCursor } from "../../types";
import { LeaderboardItem } from "./LeaderboardItem";

interface ILeaderBoardProps {}

interface ILeaderboardState {
  field: string;
  direction: string;
}

export const Leaderboard = memo((props: ILeaderBoardProps) => {
  const [state, setState] = useState<ILeaderboardState>({
    field: "createdAt",
    direction: "desc",
  });

  const { data, loading, error, fetchMore, refetch } = useQuery<{
    donations: IPaginateCursor<IDonation>;
  }>(donationsQUery, {
    variables: {
      queries: {
        field: state.field,
        direction: state.direction,
        cursor: null,
      },
    },
  });

  const loadMoreData = async () => {
    const cursor = data?.donations.cursor;

    if (cursor) {
      const { field, direction } = state;
      await fetchMore({
        variables: {
          queries: {
            field,
            direction,
            cursor,
          },
        },
      });
    }
  };

  useEffect(() => {
    (async () => {
      await refetch();
    })();
  }, [state.field]);

  console.log(state.field);

  return (
    <Card
      title={<Typography.Title level={1}>Leaderboard</Typography.Title>}
      style={{
        width: 800,
        margin: "auto",
        padding: 0,
      }}
    >
      <Radio.Group
        defaultValue="createdAt"
        buttonStyle="solid"
        onChange={(e) => setState({ ...state, field: e.target.value })}
      >
        <Radio value="createdAt">Most Recent</Radio>
        <Radio value="count">Most Pounds</Radio>
      </Radio.Group>
      <br />
      <Card
        bordered={false}
        id="scrollableDiv"
        style={{
          height: 280,
          overflow: "auto",
          padding: "0 40px",
          margin: "auto",
          marginTop: 20,
        }}
      >
        <InfiniteScroll
          dataLength={data?.donations.items.length || 0}
          next={loadMoreData}
          hasMore={data?.donations.cursor ? true : false}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <Alert
              style={{ textAlign: "left" }}
              message="Oopsss 🤐"
              description="Something went wrong when trying to get the leaderboard data"
              type="error"
              showIcon
            />
          ) : (
            <List
              dataSource={data?.donations.items}
              renderItem={(item: IDonation) => (
                <LeaderboardItem donation={item} />
              )}
            />
          )}
        </InfiniteScroll>
      </Card>
    </Card>
  );
});
