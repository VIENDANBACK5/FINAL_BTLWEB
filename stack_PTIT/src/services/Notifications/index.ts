const BASE_URL = "http://localhost:8000";
import request from 'umi-request';
import { Notification } from './typing.d';

interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Lấy danh sách thông báo
export async function fetchNotifications(): Promise<Notification[]> {
  return request(`${BASE_URL}/users/notifications`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

// Đánh dấu đã đọc một thông báo
export async function markNotificationAsRead(notificationId: number): Promise<any> {
  return request(`${BASE_URL}/users/notifications/${notificationId}/read`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

// Đánh dấu đã đọc tất cả thông báo (nếu backend có)
export async function markAllNotificationsAsRead(): Promise<any> {
  return request(`${BASE_URL}/users/notifications/read-all`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export async function getNotifications(userId: number) {
  return request(`${BASE_URL}/users/${userId}/notifications`, { method: 'GET' });
}