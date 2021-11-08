import { useQuery, useSubscription } from "@apollo/client";
import { Alert, Card, Divider, List, Skeleton, Tag } from "antd";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { bidsQuery } from "../../graphql/queries";
import { bidCreatedSubscription } from "../../graphql/subscriptions";
import { addHighestPrice, getAuction } from "../../store/auction.reducer";
import { IBid, IPaginateCursor } from "../../types";
import { toMoney } from "../../utils/toMoney";
import { BidItem } from "./BidItem";

export const Bids: React.FC<{ auctionId: string }> = ({ auctionId }) => {
  const { data, loading, error, fetchMore, refetch } = useQuery<{
    bids: IPaginateCursor<IBid>;
  }>(bidsQuery, {
    variables: {
      queries: {
        auctionId,
        field: "createdAt",
        direction: "desc",
        cursor: null,
      },
    },
  });

  const auction = useSelector(getAuction);

  const dispatch = useDispatch();

  const { data: bidCreated, loading: bidCreatedLoading } = useSubscription(
    bidCreatedSubscription
  );

  console.log("bidCreated", bidCreated);

  const loadMoreData = async () => {
    const cursor = data?.bids.cursor;

    if (cursor) {
      await fetchMore({
        variables: {
          queries: {
            auctionId,
            cursor,
          },
        },
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data?.bids && data.bids.items.length > 0) {
      dispatch(addHighestPrice(data.bids.items[0].price));
    }
  }, [data]);

  return (
    <Card
      title="Bids"
      style={{
        width: 800,
        margin: "auto",
        padding: 0,
        marginTop: 30,
      }}
      extra={
        <Tag color="processing">
          {toMoney(
            data?.bids && data.bids.items.length > 0
              ? data?.bids.items[0].price
              : auction.highestPrice
          )}
        </Tag>
      }
    >
      <Card
        bordered={false}
        id="scrollableDiv"
        style={{
          height: 280,
          overflow: "auto",
          padding: "0 40px",
          margin: "auto",
        }}
      >
        <InfiniteScroll
          dataLength={data?.bids.items.length || 0}
          next={loadMoreData}
          hasMore={data?.bids.cursor ? true : false}
          loader={<Skeleton paragraph={{ rows: 1 }} active />}
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
              dataSource={data?.bids.items}
              renderItem={(item) => <BidItem item={item} />}
            />
          )}
        </InfiniteScroll>
      </Card>
    </Card>
  );
};
