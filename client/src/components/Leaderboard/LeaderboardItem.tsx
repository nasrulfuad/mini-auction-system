import { Avatar, List, Space, Tag, Typography } from "antd";
import { IDonation } from "../../types";

interface ILeaderboardItemProps {
  donation: IDonation;
}

export function LeaderboardItem(props: ILeaderboardItemProps) {
  const { donation } = props;

  return (
    <List.Item
      key={donation.id}
      extra={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Tag style={{ marginRight: 0, marginBottom: 10 }} color="success">
            <b>{donation.count} pounds</b>
          </Tag>
          <small>{new Date(donation.createdAt).toLocaleString()}</small>
        </div>
      }
    >
      <List.Item.Meta
        style={{ textAlign: "left" }}
        avatar={<Avatar src={`https://i.pravatar.cc/50?u=${donation.email}`} />}
        title={
          <Space direction="vertical">
            <Tag color="warning">#{donation.team || "no-team"}</Tag>
            <Typography.Text strong style={{ fontSize: 16 }}>
              {donation.displayName}
            </Typography.Text>
          </Space>
        }
        description={donation?.message}
      />
    </List.Item>
  );
}
