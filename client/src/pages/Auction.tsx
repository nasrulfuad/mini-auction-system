import { useQuery } from "@apollo/client";
import {
  Button,
  Card,
  Descriptions,
  Input,
  Modal,
  Result,
  Skeleton,
} from "antd";
import Countdown from "antd/lib/statistic/Countdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Bid } from "../components/Bid";
import { Bids } from "../components/Bids";
import { auctionQuery } from "../graphql/queries";
import { addAuction } from "../store/auction.reducer";
import { addUser, getUser } from "../store/user.reducer";
import { IAuction } from "../types";
import { toMoney } from "../utils/toMoney";

export const Auction: React.FC = () => {
  const [state, setState] = useState({ name: "" });

  const params = useParams<"id">();

  const user = useSelector(getUser);

  const { data, loading, error } = useQuery<{
    auction: IAuction;
  }>(auctionQuery, {
    variables: {
      id: params.id,
    },
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const backHome = () => navigate("/");

  useEffect(() => {
    if (data?.auction) {
      dispatch(addAuction(data.auction));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) {
    return <Skeleton active />;
  }

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
    auction: { name, price, priceBIN, auctionStart, auctionEnd },
  } = data;

  return (
    <>
      <Modal
        title="Authentication needed"
        visible={!user.name}
        onOk={() =>
          dispatch(
            addUser({
              name: state.name,
            })
          )
        }
        closable={false}
        cancelButtonProps={{
          disabled: true,
        }}
      >
        <Input
          placeholder="Username..."
          autoFocus
          onChange={(e) => setState({ name: e.target.value })}
        />
      </Modal>
      <Card
        title={<h1>Auction detail </h1>}
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Home
          </Button>
        }
      >
        <Descriptions bordered column={{ md: 2, sm: 1, xs: 1 }}>
          <Descriptions.Item label="Name">{name}</Descriptions.Item>

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

          <Descriptions.Item label="Timeleft">
            <Countdown value={new Date(auctionEnd).getTime()} />
          </Descriptions.Item>
        </Descriptions>

        <Bid />

        {params.id && <Bids auctionId={params.id} />}
      </Card>
    </>
  );
};
