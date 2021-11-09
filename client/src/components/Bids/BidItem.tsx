import { Avatar, List, Tag, Typography } from "antd";
import { IBid } from "../../types";
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
        <div style={{ ...styles.container, flexDirection: "column" }}>
          <Tag style={styles.price} color="success">
            <b>{toMoney(item.price)}</b>
          </Tag>
          <small>{new Date(item.createdAt).toLocaleString()}</small>
        </div>
      }
    >
      <List.Item.Meta
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

const styles = {
  container: {
    display: "flex",
  },
  price: { marginRight: 0, marginBottom: 10 },
};
