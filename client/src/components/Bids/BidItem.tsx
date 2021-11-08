import { Avatar, List, Space, Tag, Typography } from "antd";
import { IBid, IDonation } from "../../types";
import { toMoney } from "../../utils/toMoney";

interface IBidItemProps {
  item: IBid;
}

export const BidItem: React.FC<IBidItemProps> = (props) => {
  const { item } = props;

  return (
    <List.Item
      key={item.id}
      extra={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Tag style={{ marginRight: 0, marginBottom: 10 }} color="success">
            <b>{toMoney(item.price)}</b>
          </Tag>
          <small>{new Date(item.createdAt).toLocaleString()}</small>
        </div>
      }
    >
      <List.Item.Meta
        style={{ textAlign: "left" }}
        avatar={<Avatar src={`https://i.pravatar.cc/50?u=${item.name}`} />}
        title={
          <Typography.Text strong style={{ fontSize: 16 }}>
            {item.name}
          </Typography.Text>
        }
      />
    </List.Item>
  );
};
