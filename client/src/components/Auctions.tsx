import { ClockCircleTwoTone, EyeOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Button, Card, Col, List, Row, Statistic } from "antd";
import { useNavigate } from "react-router";
import { auctionsQuery } from "../graphql/queries";
import { IAuction } from "../types";
import { toMoney } from "../utils/toMoney";

interface auctionsQueryRes {
  auctions: IAuction[];
}

export const Auctions: React.FC = () => {
  const { data, loading, error } = useQuery<auctionsQueryRes>(auctionsQuery);

  const navigate = useNavigate();

  return (
    <List
      grid={{
        gutter: 20,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 4,
      }}
      dataSource={data?.auctions}
      renderItem={(item) => {
        const isClosed = new Date(item.auctionEnd).getTime() < Date.now();

        return (
          <List.Item key={item.id}>
            <Card
              title={item.name}
              extra={
                <Button
                  type="primary"
                  size="small"
                  icon={<EyeOutlined />}
                  onClick={() => navigate(`/auction/${item.id}`)}
                >
                  View more
                </Button>
              }
            >
              <Row gutter={5}>
                <Col span={12}>
                  <Statistic title="Price" value={toMoney(item.price)} />
                </Col>
                <Col span={12}>
                  <Statistic title="Buy Now" value={toMoney(item.priceBIN)} />
                </Col>
              </Row>
              <Row gutter={5} style={{ marginTop: 20 }}>
                <Col span={12}>
                  <Statistic
                    title="Status"
                    prefix={
                      <ClockCircleTwoTone
                        twoToneColor={isClosed ? "red" : ""}
                      />
                    }
                    value={isClosed ? "Closed" : "Open"}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="End"
                    value={new Date(item.auctionEnd).toLocaleTimeString()}
                  />
                </Col>
              </Row>
            </Card>
          </List.Item>
        );
      }}
    />
  );
};
