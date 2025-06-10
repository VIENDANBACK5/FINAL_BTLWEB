import React, { useState } from 'react'
import { Modal, Button, Radio, Space } from "antd";
import type { RadioChangeEvent } from "antd";

interface ModalChooseThemeProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const ModalChooseTheme: React.FC<ModalChooseThemeProps> = ({visible, setVisible}) => {
    const [theme, setTheme] = useState<string>('light');

    const handleThemeChange = (e: RadioChangeEvent) => {
        setTheme(e.target.value);
    };

    const handleReset = () => {
      setTheme("light"); // Reset về giá trị mặc định nếu cần
    };

    const handleSubmit = () => {
        console.log("Selected theme:", theme);
        // Xử lý khi người dùng chọn xong theme
        // Ví dụ: lưu vào localStorage, gọi API, v.v.
        
        setVisible(false);
        handleReset(); // Reset lại theme sau khi xác nhận
    };
    return (
        <Modal
            title="Chọn giao diện của bạn"
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
                <p className="mb-4">Vui lòng chọn giao diện để có trải nghiệm phù hợp:</p>
                
                <Radio.Group onChange={handleThemeChange} value={theme} className="w-full">
                    <Space direction="vertical" className="w-full">
                        <Radio.Button value="light" className="flex items-center py-3 w-full h-auto">
                            <div className="flex flex-col items-start">
                                <span className="font-medium">Giao diện sáng</span>
                                <span className="text-gray-500 text-xs">Trải nghiệm sáng và dễ nhìn</span>
                            </div>
                        </Radio.Button>
                        <Radio.Button value="dark" className="flex items-center py-3 w-full h-auto">
                            <div className="flex flex-col items-start">
                                <span className="font-medium">Giao diện tối</span>
                                <span className="text-gray-500 text-xs">Trải nghiệm tối ưu cho mắt trong điều kiện ánh sáng yếu</span>
                            </div>
                        </Radio.Button>
                    </Space>
                </Radio.Group>
            </div>
        </Modal>
    )
}

export default ModalChooseTheme