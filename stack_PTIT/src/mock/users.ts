import { User } from "@/services/Users/typing";

export const users: User[] = [
  {
    id: 1,
    username: "sinh vien 1",
    email: "sv1@ptit.edu.vn",
    password: "123456",
    created_at: "5/5/2025",
    reputation: 123,
    avatar: "https://placehold.co/150?text=S",
    title: "Sinh viên 1",
    bio: "Đam mê công nghệ thông tin và học hỏi không ngừng.",
    role: "student",
    is_activate: true,
  },
  {
    id: 2,
    username: "giang vien 1",
    email: "gv1@ptit.edu.vn",
    password: "123456",
    created_at: "03/03/2025",
    reputation: 500,
    avatar: "https://placehold.co/150",
    title: "Giảng viên 1",
    bio: "Chuyên gia trong lĩnh vực khoa học máy tính, giảng dạy tại PTIT.",
    role: "teacher",
    is_activate: true,
  },
  {
    id: 3,
    username: "admin",
    email: "admin@ptit.edu.vn",
    password: "admin123",
    created_at: "01/01/2025",
    reputation: 1000,
    avatar: "https://placehold.co/150",
    role: "admin",
    is_activate: true,
  },
  {
    id: 4,
    username: "sinh vien 2",
    email: "sv2@ptit.edu.vn",
    password: "123456",
    created_at: "10/5/2025",
    reputation: 75,
    avatar: "https://placehold.co/150?text=S2",
    title: "Sinh viên 2",
    bio: "Yêu thích lập trình web và machine learning.",
    role: "student",
    is_activate: true,
  },
];

// Export mặc định cho routes
export default {
  "GET /api/users/:id": (req: any, res: any) => {
    const id = parseInt(req.params.id, 10);
    const user = users.find((u) => u.id === id);

    if (user) {
      // Không trả về password
      const { password: _, ...safeUser } = user;

      res.send({
        success: true,
        data: safeUser,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }
  },
};