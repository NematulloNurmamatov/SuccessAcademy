// import { useState } from "react";
import { Layout, Table, Tag, Progress } from "antd";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaClock } from "react-icons/fa";
import SidebarLayout from "../layouts/SidebarLayout";
import a from "../assets/Ellipse 16.png";
import b from "../assets/Ellipse 16 (1).png";
import c from "../assets/Ellipse 16 (2).png";
import d from "../assets/Ellipse 16 (3).png";
import { barData, data, pieData, stats } from "../utils/Sidebar";

const { Content } = Layout;

const columns = [
    { title: "#", dataIndex: "id", key: "id" },
    {
        title: "Lesson Time",
        dataIndex: "time",
        key: "time",
        render: (text: string) => {
            return (
                <Tag color={text && text.includes("09:00") ? "red" : "blue"} >
                    <h1 className="flex items-center gap-1 py-2"><FaClock className="mr-1" /> {text}</h1>
                </Tag>
            )
        },
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Teacher", dataIndex: "teacher", key: "teacher" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Lesson Type", dataIndex: "lessonType", key: "lessonType" },
    { title: "Room", dataIndex: "room", key: "room" },
    { title: "Students", dataIndex: "students", key: "students" },
];


// Table ma'lumotlari



export default function Dashboard() {
    return (
        <div className="fullContainer">
            <SidebarLayout>
                <Content className=" !bg-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {[a, b, c, d].map((img, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-103 transform transition-all duration-300 cursor-pointer flex items-center gap-4 hover:bg-gradient-to-r hover:from-blue-300 hover:to-teal-200 hover:text-white group"
                            >
                                <img className="w-full max-w-[60px]" src={img} alt="" />
                                <p className="text-[#334D6E] text-lg font-bold group-hover:text-white">45 New Leads</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-13 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg shadow-md col-span-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Payment Status</h3>
                            <PieChart width={200} height={200} className="mx-auto">
                                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={80} stroke="none" style={{outline:"none"}}>
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                            <p className="text-center text-gray-600 font-semibold">Payments</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md col-span-5">
                            <h3 className="text-lg font-semibold mb-4">Monthly Financial Indicators</h3>
                            <ResponsiveContainer width="100%" height={225}>
                                <BarChart data={barData}>
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#0066FF" radius={[8, 8, 6, 6]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md col-span-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">In This Month</h3>
                            <div className="flex flex-col gap-3">
                                {stats.map((stat, index) => (
                                    <div key={index} className="flex hover:shadow-md duration-200 cursor-pointer items-center bg-gray-100 p-2 rounded-lg">
                                        <Progress type="circle" percent={stat.percent} strokeColor={stat.color} size={50} strokeWidth={10} />
                                        <div className="ml-4">
                                            <p className="text-md font-bold text-gray-800">{stat.amount} so‘m</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto pb-10">
                        <Table dataSource={data} columns={columns} rowKey="id" />;
                    </div>
                </Content>
            </SidebarLayout>
        </div>
    );
}
