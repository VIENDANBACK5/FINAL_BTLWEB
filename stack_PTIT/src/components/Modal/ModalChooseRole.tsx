import React, { useState } from "react";
import { Modal, Button, Radio, Space } from "antd";
import type { RadioChangeEvent } from "antd";

interface ModalChooseRoleProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const ModalChooseRole: React.FC<ModalChooseRoleProps> = ({visible, setVisible}) => {
    const [role, setRole] = useState<string>('student');

    const handleRoleChange = (e: RadioChangeEvent) => {
        setRole(e.target.value);
    };

    const handleReset = () => {
      setRole("student"); // Reset về giá trị mặc định nếu cần
    };

    const handleSubmit = () => {
        console.log("Selected role:", role);
        // Xử lý khi người dùng chọn xong vai trò
        // Ví dụ: lưu vào localStorage, gọi API, v.v.
        
        setVisible(false);
        handleReset(); // Reset lại vai trò sau khi xác nhận
    };

    

    return (
        <Modal
            title="Chọn vai trò của bạn"
            open={visible}
            onCancel={() => {handleReset(); setVisible(false);}}
            footer={[
                <Button key="cancel" onClick={() => {handleReset(); setVisible(false);}}>
                    Huỷ
                </Button>,
                <Button 
                    key="submit" 
                    type="primary" 
                    onClick={handleSubmit}
                >
                    Xác nhận
                </Button>
            ]}
            width={400}
        >
            <div className="py-4">
                <p className="mb-4">Vui lòng chọn vai trò để có trải nghiệm phù hợp:</p>
                
                <Radio.Group onChange={handleRoleChange} value={role} className="w-full">
                    <Space direction="vertical" className="w-full">
                        <Radio.Button value="student" className="flex items-center py-3 w-full h-auto">
                            <div className="flex flex-col items-start">
                                <span className="font-medium">Sinh viên</span>
                                <span className="text-gray-500 text-xs">Đặt câu hỏi, tìm câu trả lời và học hỏi từ cộng đồng</span>
                            </div>
                        </Radio.Button>
                        
                        <Radio.Button value="teacher" className="flex items-center py-3 w-full h-auto">
                            <div className="flex flex-col items-start">
                                <span className="font-medium">Giáo viên</span>
                                <span className="text-gray-500 text-xs">Trả lời câu hỏi, chia sẻ kiến thức và hỗ trợ sinh viên</span>
                            </div>
                        </Radio.Button>
                    </Space>
                </Radio.Group>
            </div>
        </Modal>
    );
}

export default ModalChooseRole;