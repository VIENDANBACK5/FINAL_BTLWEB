// src/pages/Profile/components/Setting/ProfileSetting.tsx
import { Form, Input, Button, Upload, Avatar, message, Card, Select} from "antd";
import {
  UploadOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useModel, Link, useParams } from "umi";
import { useState } from "react";

const { TextArea } = Input;

const ProfileSetting: React.FC = () => {
  const { user, setUser } = useModel("user");
  const params = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser = { ...user, ...values };
      setUser(updatedUser);
      message.success("Cập nhật hồ sơ thành công!");
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật hồ sơ");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} đã upload thành công`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload thất bại`);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h1 className="ml-4 font-bold text-2xl">Chỉnh sửa hồ sơ</h1>
        </div>
      </div>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            username: user?.username,
            email: user?.email,
            bio: user?.bio,
            title: user?.title,
            role: user?.role,
          }}
        >
          {/* Avatar Section */}
          <Form.Item label="Ảnh đại diện">
            <div className="flex items-center gap-4">
              <Avatar size={100} src={user?.avatar} icon={<UserOutlined />} />
              <Upload
                name="avatar"
                showUploadList={false}
                onChange={handleUpload}
                beforeUpload={() => false} // Prevent auto upload
              >
                <Button icon={<UploadOutlined />}>Tải ảnh mới</Button>
              </Upload>
            </div>
          </Form.Item>

          {/* Basic Info */}
          <Form.Item
            label="Tên hiển thị"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên hiển thị!" }]}
          >
            <Input placeholder="Nhập tên hiển thị" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
            ]}
          >
            <Input placeholder="Nhập email" disabled />
          </Form.Item>

          <Form.Item
            label="Vai trò"
            name="role"
            rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
          >
            <Select placeholder="Chọn vai trò" style={{ width: 200 }}>
              <Select.Option value="student">Sinh viên</Select.Option>
              <Select.Option value="teacher">Giảng viên</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Giới thiệu về bản thân" name="bio">
            <TextArea
              rows={4}
              placeholder="Hãy viết vài dòng để giới thiệu về bản thân..."
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProfileSetting;
