import React from "react";
import { Card, Space, Tag, Avatar, Typography, Button, Tooltip } from "antd";
import { Link, useModel } from "umi";
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  SaveOutlined,
  SaveFilled
} from "@ant-design/icons";
import { Question } from "@/services/Questions/typing";

const { Text } = Typography;

interface QuestionContentProps {
  question: Question;
  handleVote: (direction: "up" | "down") => Promise<void>;
  handleSave: () => Promise<void>;  // Thêm props cho chức năng lưu
  isSaved: boolean;                 // Trạng thái đã lưu
  isSavingQuestion: boolean;        // Trạng thái đang lưu
}

const QuestionContent: React.FC<QuestionContentProps> = ({
  question,
  handleVote,
  handleSave,
  isSaved,
  isSavingQuestion
}) => {
  const { user } = useModel('user');
  const isQuestionOwner = user && question.user_id === user.id;
  
  console.log("QuestionContent nhận được:", question);
  
  // Xử lý trường hợp tags có thể là string[] hoặc object[]
  const renderTags = () => {
    if (!question.tags || question.tags.length === 0) return null;
    
    return question.tags.map((tag, index) => {
      // Nếu tag là string (tag mới tạo)
      if (typeof tag === 'string') {
        return (
          <Link to={`/questions/tagged/${tag}`} key={`new-tag-${index}`}>
            <Tag color="blue">
              {tag}
            </Tag>
          </Link>
        );
      } 
      // Nếu tag là object (tag có sẵn)
      else if (typeof tag === 'object' && tag !== null) {
        return (
          <Link to={`/questions/tagged/${tag.name}`} key={tag.id || `tag-${index}`}>
            <Tag color="blue">
              {tag.name}{" "}
              {tag.count !== undefined && (
                <span className="text-xs">({tag.count})</span>
              )}
            </Tag>
          </Link>
        );
      }
      return null;
    });
  };

  return (
    <div>
      <h1>{question.title}</h1>
      <div>{question.content}</div>
    </div>
  );
};

export default QuestionContent;
