import { Col, Layout, Row, Typography } from "antd";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Auction } from "./pages/Auction";
import { Home } from "./pages/Home";
import { getUser } from "./store/user.reducer";

const { Title } = Typography;

function App() {
  const user = useSelector(getUser);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Row justify="center">
        <Col
          span={24}
          style={{ padding: "0 50px", margin: "auto", paddingTop: "5rem" }}
        >
          <Title level={1} style={{ textAlign: "center" }}>
            {user.name ? `Hello, ${user.name}` : "Hello there"}
          </Title>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auction/:id" element={<Auction />} />
          </Routes>
        </Col>
      </Row>
    </Layout>
  );
}

export default App;
