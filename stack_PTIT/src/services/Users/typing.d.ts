export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  created_at: string;
  reputation: number;
  avatar?: string; // thêm cho UI
  title?: string; // thêm cho UI
  bio?: string; // thêm cho UI
  theme?: string; // thêm cho UI
  role: string;
  is_activate?: boolean; // true: hoạt động, false: đã khoá
}
