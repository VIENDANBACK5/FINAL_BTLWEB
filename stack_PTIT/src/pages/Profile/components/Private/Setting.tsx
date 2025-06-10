import {
  Menu,
  Tabs
} from "antd";
import React, { useState } from "react";
import type { MenuProps, TabsProps } from "antd";
import { Link, useParams } from "umi";
import ProfileSetting from "./Setting/ProfileSetting";
import AccountSetting from "./Setting/AccountSetting";
import PreferencesSetting from "./Setting/PreferencesSetting";

const Setting: React.FC = () => {
  const params = useParams<{ id: string }>();
  const userId = params.id;
  const [activeSettingTab, setActiveSettingTab] = useState<string>("profile");
  
  const handleSettingTabChange = (key: string) => {
    setActiveSettingTab(key);
  };
  
  const settingItems: TabsProps["items"] = [
    {
      key: "profile",
      label: "Thông tin tài khoản",
      children: <ProfileSetting />
    },
    {
      key: "account",
      label: "Chỉnh sửa tài khoản",
      children: <AccountSetting />
    },
    {
      key: "preferences",
      label: "Giao diện",
      children: <PreferencesSetting />
    }
  ];

  return (
    <div className="w-full">
      <Tabs
        activeKey={activeSettingTab}
        onChange={handleSettingTabChange}
        items={settingItems}
        tabPosition="left"
        className="setting-tabs"
      />
    </div>
  );
};

export default Setting;
