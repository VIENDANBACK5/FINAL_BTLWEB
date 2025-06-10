import request from "umi-request";
import { Comment } from "./typing";

interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const BASE_URL = "http://localhost:8000";

// Thêm bình luận cho câu trả lời
export async function createComment(questionId: number, answerId: number, content: string): Promise<APIResponse<Comment>> {
  return request(`${BASE_URL}/questions/${questionId}/answers/${answerId}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: { content },
  });
}

export async function getComments() {
  return request(`${BASE_URL}/comments`, { method: "GET" });
}