import { useState } from "react";
import { Button, Typography, Card, Tag, Empty, Spin, Row, Col } from "antd";
import { useModel, Link } from "umi";
import { PlusOutlined } from '@ant-design/icons';

import ModalTagFollow from "@/components/Modal/ModalTagFollow";
import ModalChooseRole from "@/components/Modal/ModalChooseRole";
import ModalChooseTheme from "@/components/Modal/ModalChooseTheme";

const { Title } = Typography;

export default function HomePage() {
  const { user } = useModel("user");
  const { followedTags, followLoading } = useModel("tag");

  // Tách riêng state cho từng modal
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [themeModalVisible, setThemeModalVisible] = useState(false);

  return (
    <div>
      {user ? (
        <div>
          <Title level={2}>Chào mừng trở lại, {user.username}!</Title>
          <p className="mb-4 text-lg">
            Khám phá câu hỏi với các chủ đề bạn yêu thích
          </p>

          <Card
            title="Các thẻ bạn đang theo dõi"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setTagModalVisible(true)}
              >
                Cập nhật
              </Button>
            }
            className="mb-6"
          >
            {followLoading ? (
              <div className="flex justify-center py-4">
                <Spin />
              </div>
            ) : followedTags.length > 0 ? (
              <Row gutter={[12, 16]}>
                {followedTags.map((tag) => (
                  <Col key={tag.id}>
                    <Link to={`/questions/tagged/${tag.name}`}>
                      <Tag color="blue" className="px-3 py-1 text-base">
                        {tag.name}{" "}
                        <span className="text-xs">({tag.count || 0})</span>
                      </Tag>
                    </Link>
                  </Col>
                ))}
              </Row>
            ) : (
              <Empty
                description="Bạn chưa theo dõi thẻ nào"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </Card>

          <ModalTagFollow
            visible={tagModalVisible}
            setVisible={setTagModalVisible}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl">Welcome to Stack PTIT</h1>
          <p className="mb-4 text-lg">
            Nơi bạn có thể đặt câu hỏi và tìm kiếm câu trả lời
          </p>

          <div className="flex space-x-4 mb-4">
            <Button type="primary" onClick={() => setTagModalVisible(true)}>
              Thiết lập thẻ theo dõi
            </Button>

            <Button type="default" onClick={() => setRoleModalVisible(true)}>
              Chọn vai trò
            </Button>
          </div>

          <Button type="default" onClick={() => setThemeModalVisible(true)}>
            Chọn giao diện
          </Button>

          <ModalChooseRole
            visible={roleModalVisible}
            setVisible={setRoleModalVisible}
          />

          <ModalTagFollow
            visible={tagModalVisible}
            setVisible={setTagModalVisible}
          />

          <ModalChooseTheme
            visible={themeModalVisible}
            setVisible={setThemeModalVisible}
          />
        </div>
      )}
    </div>
  );
}
