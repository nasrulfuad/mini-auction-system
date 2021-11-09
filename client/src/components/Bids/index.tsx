import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { Alert, Card, Divider, List, notification, Skeleton, Tag } from "antd";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { bidsQuery } from "../../graphql/queries";
import { bidCreatedSubscription } from "../../graphql/subscriptions";
import { addHighestPrice, getAuction } from "../../store/auction.reducer";
import { getUser } from "../../store/user.reducer";
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

  const user = useSelector(getUser);

  const client = useApolloClient();

  const auction = useSelector(getAuction);

  const dispatch = useDispatch();

  const { data: bidCreated } = useSubscription<{ BID_CREATED: IBid }>(
    bidCreatedSubscription
  );

  useEffect(() => {
    if (bidCreated) {
      const { BID_CREATED } = bidCreated;

      client.writeQuery({
        query: bidsQuery,
        data: {
          bids: {
            write: true,
            ...data?.bids,
            items: [BID_CREATED],
          },
        },
        variables: {
          queries: {
            auctionId,
            field: "createdAt",
            direction: "desc",
            cursor: data?.bids.cursor,
          },
        },
      });

      dispatch(addHighestPrice(BID_CREATED.price));

      const isBidOwner = user.name === BID_CREATED.name;

      if (isBidOwner) {
        notification.success({
          message: "Congratulation",
          description: "Your bid has been placed!",
        });
      } else {
        notification.info({
          message: "New Bid!",
          description: `${BID_CREATED.name} has been placed new bid!`,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bidCreated]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data?.bids && data.bids.items.length > 0 && !bidCreated) {
      dispatch(addHighestPrice(data.bids.items[0].price));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Card
      title="Bids"
      style={styles.container}
      extra={<Tag color="processing">{toMoney(auction.highestPrice)}</Tag>}
    >
      <Card bordered={false} id="scrollableDiv" style={styles.subContainer}>
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
              dataSource={[...(data?.bids.items || [])].sort(
                (a, b) => b?.price - a?.price
              )}
              renderItem={(item) => <BidItem item={item} />}
            />
          )}
        </InfiniteScroll>
      </Card>
    </Card>
  );
};

const styles = {
  container: {
    width: "100%",
    margin: "auto",
    padding: 0,
    marginTop: 30,
  },
  subContainer: {
    height: 280,
    overflow: "auto",
    padding: "0 40px",
    margin: "auto",
  },
};
