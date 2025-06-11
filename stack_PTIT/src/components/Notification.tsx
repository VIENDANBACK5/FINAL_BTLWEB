import React, { useState } from 'react';
import { Badge, Button, Divider, List, Popover, Tabs, Tooltip, Spin, message } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { fetchNotifications } from '@/services/Notifications';
import { Notification as NotificationType } from '@/services/Notifications/typing';

interface NotificationProps {
  bellColor?: string;
}

const Notification: React.FC<NotificationProps> = ({ bellColor }) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleOpenChange = async (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      setLoading(true);
      try {
        const res = await fetchNotifications();
        // Nếu backend trả về mảng trực tiếp
        if (Array.isArray(res)) {
          setNotifications(res);
        } else if (res && Array.isArray(res.data)) {
          setNotifications(res.data);
        } else {
          setNotifications([]);
        }
      } catch (e) {
        message.error('Không thể tải thông báo');
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <Tooltip title="Thông báo">
      <Popover
        content={
          loading ? (
            <div className="flex justify-center items-center py-8">
              <Spin size="large" />
            </div>
          ) : (
            <Tabs
              defaultActiveKey="1"
              centered
              items={[
                {
                  key: "1",
                  label: `Thông báo (${unreadCount})`,
                  children: (
                    <List
                      className="pb-8 max-h-[400px] overflow-y-auto"
                      dataSource={notifications}
                      locale={{ emptyText: 'Không có thông báo nào' }}
                      renderItem={(item) => (
                        <List.Item
                          key={item.id}
                          className={`hover:bg-[#f5f5f5] hover:cursor-pointer ${item.is_read ? '' : 'font-bold'}`}
                        >
                          <List.Item.Meta
                            title={<p>{item.content}</p>}
                            description={item.created_at}
                            className="px-3"
                          />
                        </List.Item>
                      )}
                    />
                  ),
                },
              ]}
              className="w-[400px]"
            />
          )
        }
        onOpenChange={handleOpenChange}
        trigger="click"
        placement="bottomRight"
        className="relative"
      >
        <Badge count={unreadCount} size="small" offset={[0, 0]}>
          <Button
            type="text"
            icon={<BellOutlined style={{ fontSize: 20, color: bellColor }} />}
            style={{ color: "#fff" }}
          />
        </Badge>
      </Popover>
    </Tooltip>
  );
};

export default Notification;
