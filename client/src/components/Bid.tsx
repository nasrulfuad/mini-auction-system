import { useMutation } from "@apollo/client";
import { Button, Card, InputNumber, Skeleton, Space } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createBidMutation } from "../graphql/mutations";
import { getAuction } from "../store/auction.reducer";
import { getUser } from "../store/user.reducer";

export const Bid: React.FC = () => {
  const [highestPrice, setHighestPrice] = useState(0);

  const auction = useSelector(getAuction);
  const user = useSelector(getUser);

  const [addPlace] = useMutation(createBidMutation);

  useEffect(() => {
    if (auction.highestPrice) {
      setHighestPrice(auction.highestPrice + 1);
    }
  }, [auction.highestPrice]);

  const handlePlace = async () => {
    await addPlace({
      variables: {
        createBidInput: {
          auctionId: auction.item?.id,
          name: user.name,
          price: highestPrice,
        },
      },
    });
  };

  if (!auction) {
    return <Skeleton active />;
  }

  return (
    <Card
      style={{ width: 800, margin: "auto", marginTop: 30, textAlign: "center" }}
      title={<h4 style={{ textAlign: "left" }}>Place your bid</h4>}
    >
      <Space direction="vertical" style={{ width: "50%" }}>
        <InputNumber
          addonBefore={
            <Button
              type="text"
              disabled={auction.highestPrice + 1 >= highestPrice}
              onClick={() => setHighestPrice(highestPrice - 1)}
            >
              <b>-</b>
            </Button>
          }
          addonAfter={
            <Button
              type="text"
              onClick={(e) => setHighestPrice(highestPrice + 1)}
            >
              <b>+</b>
            </Button>
          }
          min={auction.highestPrice + 1}
          value={highestPrice}
          onChange={(value) => setHighestPrice(value)}
          size="large"
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
        />
        <Button type="primary" block onClick={handlePlace}>
          Place
        </Button>
      </Space>
    </Card>
  );
};
