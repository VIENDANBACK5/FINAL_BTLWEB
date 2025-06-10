// src/pages/Profile/components/Setting/PreferencesSetting.tsx
import {
  Form,
  Switch,
  Select,
  Button,
  Card,
  message,
  Radio,
  Slider,
} from "antd";
import {
  ArrowLeftOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Link, useParams } from "umi";
import { useState } from "react";

const { Option } = Select;

const PreferencesSetting: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Cập nhật cài đặt giao diện thành công!");
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật cài đặt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h1 className="ml-4 font-bold text-2xl">Cài đặt giao diện</h1>
        </div>
      </div>

      <div className="space-y-6">
        {/* Theme Settings */}
        <Card title="Giao diện">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              theme: "light",
              language: "vi",
              fontSize: 14,
              showNotifications: true,
              autoSave: true,
              showOnlineStatus: true,
            }}
          >
            <Form.Item label="Chủ đề" name="theme">
              <Radio.Group>
                <Radio.Button value="light">
                  <SunOutlined /> Sáng
                </Radio.Button>
                <Radio.Button value="dark">
                  <MoonOutlined /> Tối
                </Radio.Button>
                <Radio.Button value="auto">Tự động</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Card>

        {/* Notification Settings */}
        <Card title="Thông báo">
          <Form.Item
            label="Nhận thông báo"
            name="showNotifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Thông báo email"
            name="emailNotifications"
            valuePropName="checked" 
          >
            <Switch onChange={() => message.info('chưa phát triển')} />
          </Form.Item> 

          <Form.Item
            label="Thông báo khi có câu trả lời mới"
            name="answerNotifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Card>

        {/* Privacy Settings */}
        {/* <Card title="Quyền riêng tư">
          <Form.Item
            label="Hiển thị trạng thái online"
            name="showOnlineStatus"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Cho phép người khác xem hoạt động của tôi"
            name="showActivity"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Hiển thị email trong hồ sơ công khai"
            name="showEmail"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Card> */}

        {/* Editor Settings */}
        {/* <Card title="Trình soạn thảo">
          <Form.Item
            label="Tự động lưu bản nháp"
            name="autoSave"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Hiển thị xem trước khi soạn thảo"
            name="showPreview"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item label="Font chữ cho code" name="codeFont">
            <Select style={{ width: 200 }}>
              <Option value="monaco">Monaco</Option>
              <Option value="consolas">Consolas</Option>
              <Option value="courier">Courier New</Option>
            </Select>
          </Form.Item>
        </Card> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
          >
            Lưu cài đặt
          </Button>
        </Form.Item>
      </div>
    </div>
  );
};

export default PreferencesSetting;
