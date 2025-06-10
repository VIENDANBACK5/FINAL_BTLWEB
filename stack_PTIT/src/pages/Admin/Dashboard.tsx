import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Button, message } from 'antd';
import { UserOutlined, FileTextOutlined, CommentOutlined, EyeOutlined, ArrowLeftOutlined, ExpandOutlined, ExpandAltOutlined } from '@ant-design/icons';
import { Bar } from '@ant-design/plots';
import { useModel } from 'umi';
import { getUsers } from '@/services/Users';
import { getQuestions } from '@/services/Questions';
import { getComments } from '@/services/Comments';

const AdminDashboard: React.FC = () => {
  // Lấy dữ liệu từ model
  const user  = useModel('user');
  const questions = useModel('Question.question');
  const [activeTab, setActiveTab] = useState('posts');
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalViews, setTotalViews] = useState(0);

  // Tạo mảng nhãn cho 5 ngày gần nhất (27/05/2025 - 31/05/2025)
  const labels = ['27/05/2025', '28/05/2025', '29/05/2025', '30/05/2025', '31/05/2025'];

  // Dữ liệu cho thống kê người dùng
  const userChartData = [
    ...labels.map((date, idx) => ({
      type: 'Số sinh viên đăng nhập',
      date,
      value: [120, 130, 140, 145, 150][idx],
    })),
    ...labels.map((date, idx) => ({
      type: 'Số giảng viên đăng nhập',
      date,
      value: [15, 18, 17, 19, 20][idx],
    })),
  ];

  // Dữ liệu cho thống kê bài viết
  const postChartData = [
    ...labels.map((date, idx) => ({
      type: 'Bài viết hoàn thành',
      date,
      value: [25, 28, 30, 32, 30][idx],
    })),
    ...labels.map((date, idx) => ({
      type: 'Bài viết được đăng',
      date,
      value: [40, 45, 48, 50, 50][idx],
    })),
  ];

  const chartConfig = {
    data: activeTab === 'posts' ? postChartData : userChartData,
    xField: 'value',
    yField: 'date',
    seriesField: 'type',
    isStack: false,
    legend: { position: 'top' },
    color: activeTab === 'posts'
      ? ['#4CAF50', '#FF4D4F']
      : ['#FF9800', '#2196F3'],
    label: { position: 'right' as const },
    xAxis: { title: { text: 'Số lượng' } },
    yAxis: { title: { text: 'Ngày' } },
    height: 350,
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const usersRes = await getUsers();
      setTotalUsers(usersRes.data.length);
      const questionsRes = await getQuestions();
      setTotalQuestions(questionsRes.data.list.length);
      setTotalViews(questionsRes.data.list.reduce((sum: number, q: any) => sum + (q.views || 0), 0));
      const commentsRes = await getComments();
      setTotalComments(commentsRes.data.length);
    } catch {
      message.error('Không thể lấy dữ liệu thống kê!');
    }
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      {/* Tiêu đề */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Button className="hover:bg-gray-200 p-2 rounded-lg transition-colors">
            <ArrowLeftOutlined className="w-5 h-5 text-gray-600" />
          </Button>
          <div className="flex items-center space-x-2">
            <h1 className="font-semibold text-gray-800 text-xl">Bảng Điều Khiển Quản Trị</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="hover:bg-gray-200 p-2 rounded-lg transition-colors">
            <ExpandAltOutlined className="w-4 h-4 text-gray-600" />
          </Button>
          <Button className="hover:bg-gray-200 p-2 rounded-lg transition-colors">
            <ExpandOutlined className="w-4 h-4 text-gray-600" />
          </Button>
        </div>
      </div>

      <div className="gap-6 grid grid-cols-12">
        {/* Hàng đầu tiên - Thống kê chính */}
        <div className="col-span-3">
          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
            <Statistic
              title="Tổng số người dùng"
              value={totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </div>
        </div>

        <div className="col-span-3">
          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
            <Statistic
              title="Tổng số bài viết"
              value={totalQuestions}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </div>
        </div>

        <div className="col-span-3">
          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
            <Statistic
              title="Tổng số bình luận"
              value={totalComments}
              prefix={<CommentOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </div>
        </div>

        <div className="col-span-3">
          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
            <Statistic
              title="Tổng số lượt xem"
              value={totalViews}
              prefix={<EyeOutlined />}
              valueStyle={{ color: '#8b5cf6' }}
            />
          </div>
        </div>

        {/* Hàng thứ hai - Nút chuyển đổi và biểu đồ */}
        <div className="col-span-12">
          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-800 text-lg">
                {activeTab === 'posts'
                  ? 'Thống kê bài viết 5 ngày gần nhất'
                  : 'Thống kê đăng nhập 5 ngày gần nhất'}
              </h3>
              <div>
                <Button
                  type={activeTab === 'posts' ? 'primary' : 'default'}
                  onClick={() => setActiveTab('posts')}
                  style={{ marginRight: '10px' }}
                >
                  Thống kê bài đăng
                </Button>
                <Button
                  type={activeTab === 'users' ? 'primary' : 'default'}
                  onClick={() => setActiveTab('users')}
                >
                  Thống kê người dùng
                </Button>
              </div>
            </div>
            <Bar {...chartConfig} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
