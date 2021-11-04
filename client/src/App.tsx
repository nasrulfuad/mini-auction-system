import { useQuery, useSubscription } from "@apollo/client";
import { Col, Image, Layout, Row, Spin, Typography } from "antd";
import "./App.css";
import { Counter } from "./components/Counter";
import { Leaderboard } from "./components/Leaderboard";
import { totalDonationQuery } from "./graphql/queries";
import { totalUpdatedSubscription } from "./graphql/subscriptions";

const { Title } = Typography;

function App() {
  const { loading, error, data } = useQuery(totalDonationQuery);

  const { data: totalUpdatedSubscriptionResponse } = useSubscription(
    totalUpdatedSubscription
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Row justify="center">
        <Col span={24} style={{ textAlign: "center" }}>
          <Image
            src="https://assets01.teamassets.net/assets/images/teamseas-tm-logo.png"
            preview={false}
          />
          <br />

          <Title level={1}>JOIN THE MOVEMENT!</Title>

          <Title level={2}>
            Help us remove 30 million pounds of trash by January 1st, 2022.
          </Title>

          <Title>
            {loading ? (
              <Spin />
            ) : (
              <Counter
                from={0}
                to={
                  totalUpdatedSubscriptionResponse?.totalUpdated?.total ||
                  data.totalDonations
                }
              />
            )}
          </Title>

          <Leaderboard />
        </Col>
      </Row>
    </Layout>
  );
}

export default App;
