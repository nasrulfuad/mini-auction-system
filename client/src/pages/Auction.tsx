import { useQuery } from "@apollo/client";
import { Button, Card, Descriptions, Result, Skeleton } from "antd";
import Countdown from "antd/lib/statistic/Countdown";
import { useNavigate, useParams } from "react-router";
import { auctionQuery } from "../graphql/queries";
import { IAuction } from "../types";
import { toMoney } from "../utils/toMoney";

export const Auction: React.FC = () => {
  const params = useParams<"id">();

  const { data, loading, error } = useQuery<{
    auction: IAuction;
  }>(auctionQuery, {
    variables: {
      id: params.id,
    },
  });

  const navigate = useNavigate();

  const backHome = () => navigate("/");

  if (!data) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the auction you viewed does not exist."
        extra={
          <Button type="primary" onClick={backHome}>
            Back Home
          </Button>
        }
      />
    );
  }

  if (error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button type="primary" onClick={backHome}>
            Back Home
          </Button>
        }
      />
    );
  }

  const {
    auction: { name, price, priceBIN, auctionStart, auctionEnd, bids },
  } = data;

  return (
    <Card>
      {loading ? (
        <Skeleton active />
      ) : (
        <Descriptions
          title="Auction detail"
          bordered
          column={{ md: 2, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="Name">{name}</Descriptions.Item>

          <Descriptions.Item label="Total Bids">
            {bids?.length}
          </Descriptions.Item>

          <Descriptions.Item label="Start Price">
            {toMoney(price)}
          </Descriptions.Item>

          <Descriptions.Item label="Buy Now">
            {toMoney(priceBIN)}
          </Descriptions.Item>

          <Descriptions.Item label="Start">
            {new Date(auctionStart).toLocaleString()}
          </Descriptions.Item>

          <Descriptions.Item label="End">
            {new Date(auctionEnd).toLocaleString()}
          </Descriptions.Item>

          <Descriptions.Item label="Current Price">
            {toMoney(bids.length > 0 ? bids[0].price : price)}
          </Descriptions.Item>

          <Descriptions.Item label="Timeleft">
            <Countdown value={new Date(auctionEnd).getTime()} />
          </Descriptions.Item>
        </Descriptions>
      )}
    </Card>
  );
};
