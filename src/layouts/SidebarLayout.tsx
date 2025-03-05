import { Layout, Menu } from "antd";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChartPie, FaUserGraduate, FaUsers, FaLayerGroup, FaMoneyBillWave, FaCog, FaBuilding, FaChevronDown } from "react-icons/fa";
import { SidebarProps } from "../types/SidebarLayout";

const { Sider, Content } = Layout;

const menuItems = [
    { key: "dashboard", icon: <FaChartPie />, label: "Dashboard" },
    { key: "leads", icon: <FaUserGraduate />, label: "Leads" },
    { key: "clients", icon: <FaUsers />, label: "Clients" },
    { key: "groups", icon: <FaLayerGroup />, label: "Groups" },
    { key: "finance", icon: <FaMoneyBillWave />, label: "Finance" },
    { key: "settings", icon: <FaCog />, label: "Settings" },
];

export default function SidebarLayout({ children }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [isMainBranchOpen, setIsMainBranchOpen] = useState(false);
    const location = useLocation();

    return (
        <Layout className="h-screen flex !bg-white">
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                width={250}
                className="h-screen !bg-white"
            >
                <div className={`h-[60px] flex items-center gap-3 px-4 transition-all ${collapsed ? "justify-center" : ""}`}>
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <FaBuilding className="text-white" />
                    </div>
                    {!collapsed && (
                        <div>
                            <h2 className="text-base font-semibold text-black">Main branch</h2>
                            <p className="text-sm text-gray-500">Nukus city</p>
                        </div>
                    )}
                    {!collapsed && (
                        <div
                            onClick={() => setIsMainBranchOpen(!isMainBranchOpen)}
                            className="ml-auto cursor-pointer bg-white p-2 rounded-full"
                        >
                            <FaChevronDown
                                className={`text-gray-400 transition-transform ${isMainBranchOpen ? "rotate-180" : ""}`}
                            />
                        </div>
                    )}
                </div>


                {isMainBranchOpen && (
                    <div className="px-4 py-3 bg-gray-100 rounded-md mt-3">
                        {["Branch 1", "Branch 2", "Branch 3"].map((branch, index) => (
                            <p key={index} className="text-sm text-gray-700 font-medium cursor-pointer hover:bg-gray-200 hover:text-blue-600 py-2 px-3 rounded-lg transition-all">
                                <FaBuilding className="inline mr-2 text-blue-500" />
                                {branch}
                            </p>
                        ))}
                    </div>
                )}

                <Menu
                    mode="inline"
                    selectedKeys={[location.pathname.replace("/", "") || "dashboard"]}
                    items={menuItems.map((item) => ({
                        key: item.key,
                        icon: item.icon,
                        label: <Link to={`/${item.key}`} className="text-gray-700">{item.label}</Link>,
                    }))}
                />
            </Sider>

            <Layout className="flex-1 overflow-y-auto">
                <Content className="p-6 bg-gray-100 min-h-screen">{children}</Content>
            </Layout>
        </Layout>
    );
}
