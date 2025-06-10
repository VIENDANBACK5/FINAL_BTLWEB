import { Form, Input, Button, Card, Divider, message, Checkbox } from "antd";
import React, { useState } from "react";
import {
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Link, useModel, history } from "umi";
import { register } from "@/services/auth";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useModel('user');
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    if (values.password !== values.confirmPassword) {
      message.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    if (!values.agreement) {
      message.error("Bạn cần đồng ý với điều khoản sử dụng!");
      return;
    }

    setLoading(true);
    try {
      const res = await register({
        email: values.email,
        password: values.password,
        username: values.username,
      });
      
      if (res.success) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        message.success("Đăng ký thành công");
        history.push("/");
      }
    } catch (err: any) {
      message.error(err?.data?.message || "Lỗi đăng ký");
    } finally {
      setLoading(false);
    }
  };

  return (

        <Card 
          title="Đăng ký tài khoản mới"
          className="shadow-md w-full max-w-md register-card"
          styles={{ header: { fontSize: "20px", textAlign: "center", fontWeight: "bold" } }}
        >
          <div className="flex gap-2 mb-4">
            <Button
              type="default"
              className="flex justify-center items-center bg-[#db4437] hover:opacity-90 h-10 text-white"
              style={{ width: "calc(100%/3 - 10px)" }}
              icon={<GoogleOutlined />}
            />
            <Button
              type="default"
              className="flex justify-center items-center bg-[#3b5998] hover:opacity-90 h-10 text-white"
              style={{ width: "calc(100%/3 - 10px)" }}
              icon={<FacebookOutlined />}
            />
            <Button
              type="default"
              className="flex justify-center items-center bg-[#333] hover:opacity-90 h-10 text-white" 
              style={{ width: "calc(100%/3 - 10px)" }}
              icon={<GithubOutlined />}
            />
          </div>
          
          <Divider style={{ borderColor: "#d9d9d9" }}>hoặc đăng ký với email</Divider>
          
          <Form 
            form={form}
            name="register" 
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              label={<span className="font-bold">Tên đầy đủ</span>}
              rules={[
                { required: true, message: "Vui lòng nhập tên của bạn!" },
                { min: 3, message: "Tên phải có ít nhất 3 ký tự!" }
              ]}
            >
              <Input 
                placeholder="Nhập tên đầy đủ của bạn" 
                size="large" 
              />
            </Form.Item>
            
            <Form.Item
              name="email"
              label={<span className="font-bold">Email</span>}
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không đúng định dạng!" }
              ]}
            >
              <Input 
                placeholder="Nhập địa chỉ email của bạn" 
                size="large" 
              />
            </Form.Item>
            
            <Form.Item
              name="password"
              label={<span className="font-bold">Mật khẩu</span>}
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" }
              ]}
            >
              <Input.Password
                placeholder="Tạo mật khẩu mới"
                size="large"
              />
            </Form.Item>
            
            <Form.Item
              name="confirmPassword"
              label={<span className="font-bold">Xác nhận mật khẩu</span>}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                  },
                })
              ]}
            >
              <Input.Password
                placeholder="Xác nhận mật khẩu của bạn"
                size="large"
              />
            </Form.Item>
            
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                { 
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Bạn cần đồng ý với điều khoản sử dụng!')) 
                }
              ]}
            >
              <Checkbox>
                Tôi đã đọc và đồng ý với <a href="#" className="text-blue-600">Điều khoản sử dụng</a> và <a href="#" className="text-blue-600">Chính sách bảo mật</a>
              </Checkbox>
            </Form.Item>
            
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="bg-blue-600 hover:bg-blue-700 w-full"
                size="large"
              >
                Đăng ký
              </Button>
            </Form.Item>
            
            <div className="text-center">
              Đã có tài khoản? <Link className="text-blue-600 hover:text-blue-800" to="/auth/login">Đăng nhập</Link>
            </div>
          </Form>
        </Card>
  );
};

export default RegisterPage; 