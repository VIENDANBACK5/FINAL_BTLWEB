import React, { useState, useEffect } from "react";
import { Table, Avatar, Button, Typography, Space, Card, Modal, Tag, Tooltip, message } from "antd";
import { EyeOutlined, DeleteOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { getUsers, deleteUser, toggleUserStatus } from "@/services/Users";

const { Title, Text } = Typography;

const UserList: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      if (res.success) {
        setUsers(res.data);
      } else {
        message.error(res.message || "Lỗi khi lấy danh sách người dùng");
      }
    } catch (e) {
      message.error("Không thể kết nối tới server!");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (user: any) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((u: any) => u.id !== id));
      message.success("Đã xoá người dùng");
      if (selectedUser && selectedUser.id === id) closeModal();
    } catch {
      message.error("Lỗi khi xoá người dùng");
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      await toggleUserStatus(id);
      setUsers(prev => prev.map(u => u.id === id ? { ...u, is_activate: !u.is_activate } : u));
      if (selectedUser && selectedUser.id === id) {
        setSelectedUser((prev: any) => prev ? { ...prev, is_activate: !prev.is_activate } : prev);
      }
    } catch {
      message.error("Lỗi khi cập nhật trạng thái người dùng");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
      render: (text: string) => <a style={{ color: "#1677ff" }}>{text}</a>,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (url: string) => <Avatar size={40} src={url} />,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Trạng thái",
      dataIndex: "is_activate",
      key: "is_activate",
      width: 110,
      render: (is_activate: boolean) => (
        <Tag color={is_activate ? 'green' : 'red'} style={{ fontWeight: 600, fontSize: 14, padding: '2px 12px' }}>
          {is_activate ? 'Hoạt động' : 'Đã khoá'}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => openModal(record)}
            />
          </Tooltip>
          <Tooltip title="Xoá tài khoản">
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => handleDeleteUser(record.id)}
            />
          </Tooltip>
          <Tooltip title={record.is_activate ? 'Khoá tài khoản' : 'Mở khoá tài khoản'}>
            <Button
              icon={record.is_activate ? <LockOutlined /> : <UnlockOutlined />}
              type={record.is_activate ? 'default' : 'primary'}
              danger={record.is_activate}
              size="small"
              onClick={() => handleToggleStatus(record.id)}
              style={{ minWidth: 36 }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        style={{
          margin: "20px",
          borderRadius: 12,
          boxShadow: "0 2px 8px #f0f1f2",
        }}
      >
        <div
          style={{
            backgroundColor: "#f0f5ff",
            padding: "12px 20px",
            borderRadius: "8px",
            marginBottom: 20,
          }}
        >
          <Title level={4} style={{ margin: 0, color: "#1d39c4" }}>
            Danh sách người dùng
          </Title>
        </div>
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered={false}
          style={{ backgroundColor: "white" }}
        />
      </Card>

      {/* Modal chi tiết người dùng */}
      <Modal
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
        width={700}
        style={{ top: 20 }}
        bodyStyle={{
          background: '#f7f8fa',
          padding: 0,
          borderRadius: 16,
        }}
        centered
      >
        {selectedUser && (
          <div style={{ padding: 0, background: 'transparent' }}>
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '18px 0 18px 0',
                borderRadius: '16px 16px 0 0',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: 1,
                marginBottom: 0,
              }}
            >
             Thông tin người dùng
            </div>

            {/* Main content */}
            <div style={{ padding: 32, background: 'transparent' }}>
              <div style={{
                display: 'flex',
                gap: 32,
                marginBottom: 32,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
                {/* Avatar + Tên */}
                <div style={{
                  background: '#fff',
                  borderRadius: 16,
                  boxShadow: '0 2px 8px #e0e7ff',
                  padding: 24,
                  minWidth: 220,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Avatar
                    src={selectedUser.avatar}
                    size={80}
                    style={{
                      border: '3px solid #1890ff',
                      marginBottom: 12,
                      background: '#f0f5ff',
                    }}
                  />
                  <Title level={4} style={{ color: '#1d39c4', margin: 0, marginBottom: 4, textAlign: 'center' }}>
                    {selectedUser.username}
                  </Title>
                  {selectedUser.title && (
                    <Text type="secondary" style={{ fontSize: 15, textAlign: 'center' }}>{selectedUser.title}</Text>
                  )}
                </div>
                {/* Thông tin chi tiết */}
                <div style={{
                  background: '#fff',
                  borderRadius: 16,
                  boxShadow: '0 2px 8px #e0e7ff',
                  padding: 24,
                  minWidth: 260,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  {Object.entries(selectedUser)
                    .filter(([key]) => key !== 'avatar' && key !== 'username' && key !== 'title' && key !== 'password')
                    .map(([key, value]) => (
                      key === 'is_activate' ? (
                        <div key={key} style={{ marginBottom: 14, display: 'flex', alignItems: 'center' }}>
                          <Text strong style={{ minWidth: 120, color: '#595959', fontSize: 15 }}>Trạng thái:</Text>
                          <Tag color={value ? 'green' : 'red'} style={{ marginLeft: 10, fontSize: 15, padding: '2px 16px' }}>
                            {value ? 'Hoạt động' : 'Đã khoá'}
                          </Tag>
                        </div>
                      ) : (
                        <div key={key} style={{ marginBottom: 14, display: 'flex', alignItems: 'center' }}>
                          <Text strong style={{ minWidth: 120, color: '#595959', fontSize: 15 }}>
                            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                          </Text>
                          <Text style={{ marginLeft: 10, color: '#262626', fontSize: 15 }}>{String(value)}</Text>
                        </div>
                      )
                    ))}
                  {/* Nếu chưa có is_activate vẫn hiển thị Hoạt động */}
                  {!('is_activate' in selectedUser) && (
                    <div style={{ marginBottom: 14, display: 'flex', alignItems: 'center' }}>
                      <Text strong style={{ minWidth: 120, color: '#595959', fontSize: 15 }}>Trạng thái:</Text>
                      <Tag color="green" style={{ marginLeft: 10, fontSize: 15, padding: '2px 16px' }}>Hoạt động</Tag>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* XÓA nút đóng ở dưới cùng */}
          </div>
        )}
      </Modal>
    </>
  );
};

export default UserList;
