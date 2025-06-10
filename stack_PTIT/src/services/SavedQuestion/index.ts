const BASE_URL = "http://localhost:8000";
import request from 'umi-request';
import { SavedQuestionWithDetails } from './typing';

interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// Lưu câu hỏi
export async function saveQuestion(questionId: number): Promise<APIResponse<SavedQuestionWithDetails>> {
  return request(`${BASE_URL}/questions/${questionId}/save`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// Bỏ lưu câu hỏi
export async function unsaveQuestion(questionId: number): Promise<APIResponse<SavedQuestionWithDetails>> {
  return request(`${BASE_URL}/questions/${questionId}/save`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// Lấy danh sách câu hỏi đã lưu của người dùng
export async function getSavedQuestions(userId: number): Promise<APIResponse<SavedQuestionWithDetails[]>> {
  return request(`${BASE_URL}/users/${userId}/saved-questions`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// Kiểm tra trạng thái lưu của câu hỏi
export async function checkSaveStatus(questionId: number): Promise<APIResponse<{isSaved: boolean}>> {
  return request(`${BASE_URL}/questions/${questionId}/save-status`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

