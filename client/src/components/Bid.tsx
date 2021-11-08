import { Button, Card, InputNumber, Skeleton, Space } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAuction } from "../store/auction.reducer";

export const Bid: React.FC = () => {
  const [highestPrice, setHighestPrice] = useState(0);

  const auction = useSelector(getAuction);

  useEffect(() => {
    if (auction.highestPrice) {
      setHighestPrice(auction.highestPrice + 1);
    }
  }, [auction.highestPrice]);

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
          addonBefore="+"
          addonAfter="$"
          min={auction.highestPrice + 1}
          value={highestPrice}
          onChange={(value) => setHighestPrice(value)}
          size="large"
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
        />
        <Button type="primary" block>
          Place
        </Button>
      </Space>
    </Card>
  );
};
