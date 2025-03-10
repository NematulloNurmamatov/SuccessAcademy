import { useState } from "react";
import { Button, Table, Tag, Input, Form, notification } from "antd";
import SidebarLayout from "../layouts/SidebarLayout";
import { useGetClientListQuery, useCreateStudentMutation } from "../services/Service";
import { SearchOutlined, FilterOutlined, UserAddOutlined } from "@ant-design/icons";
import { ThreeDot } from "react-loading-indicators";
import { FaStar } from "react-icons/fa";
import AddStudentModal from "../components/AddStudentModal";
import { useNavigate } from "react-router-dom";

export default function Clients() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [showSearch, setShowSearch] = useState(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createStudent, { isLoading, error }] = useCreateStudentMutation();

    const [form] = Form.useForm();
    const pageSize = 30;

    const { data, refetch } = useGetClientListQuery({ page: currentPage, size: pageSize });

    if (isLoading) {
        return (
            <SidebarLayout>
                <div className="flex justify-center items-center">
                    <ThreeDot color="#4e31cc" size="small" text="" textColor="" />
                </div>
            </SidebarLayout>
        );
    }

    if (error) return <SidebarLayout><div>Error loading clients</div></SidebarLayout>;

    const filteredData = data?.results?.filter((client: any) =>
        client.full_name?.toLowerCase().includes(searchValue.toLowerCase())
    ) || [];
    

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Name", dataIndex: "full_name", key: "full_name" },
        {
            title: "Points",
            dataIndex: "point",
            key: "point",
            render: (point: number) => (
                <span className="bg-[#faf1e4] cursor-pointer px-2 py-1 rounded-md text-[12px]" style={{ fontWeight: "500", display: "flex", alignItems: "center", gap: "5px" }}>
                    <FaStar className="mb-1 text-amber-500" /> {point} points
                </span>
            )
        },
        {
            title: "Lesson",
            dataIndex: "group_carts",
            key: "lesson",
            render: (group_carts: any[]) => (
                <span style={{ color: "#707683" }}>
                    {group_carts?.length ? group_carts[0]?.group_name : "No Group"}
                </span>
            )
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                let backgroundColor = "#2ED47A";
                if (status === "Frozen") backgroundColor = "#FFB946"; // Orange
                if (status === "Finished") backgroundColor = "#33A9FF"; // Blue
                if (status === "Stopped") backgroundColor = "#F7685B"; // Red

                return (
                    <Tag style={{ backgroundColor, color: "white", border: "none", padding: "3px 10px" }}>
                        {status.toUpperCase()}
                    </Tag>
                );
            }
        },
        {
            title: "Phone number",
            dataIndex: "phone_number_1",
            key: "phone",
            render: (phone: string) => <span style={{ color: "#707683", }}>{phone}</span>
        },
        {
            title: "Balance",
            dataIndex: "balance",
            key: "balance",
            render: (balance: number) => <span className="text-[#707683]">{balance.toLocaleString()} so'm</span>
        },
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };


    const handleSubmit = async (values: any) => {
        console.log("Yangi student qo'shilyapti:", values);

        const payload = {
            first_name: values.first_name || "No'malum",
            last_name: values.last_name || "No'malum",
            phone_number_1: values.phone_number_1.trim() || "",
            birthday: values.birthday || "2000-01-01",
            group_type: values.group_type || "group",
            days: values.days || "odd",
            discount_first_month: values.discount_first_month ?? true,
            finance_type: values.finance_type || "cash",
            start_date: values.start_date || "2024-01-01",
            branch: values.branch || null,
            subject: values.subject || null,
            level: values.level || null,
            teacher: values.teacher || null,
            monthly_discount: values.monthly_discount ?? 1000,
            first_month_discount: values.monthly_discount ?? 1000,
            group_id: values.group_id,
            calculation_type: values.calculation_type || 1,
        };

        console.log(values);


        try {
            const response = await createStudent(payload).unwrap();
            console.log("Serverdan qaytgan ma’lumot:", response);

            notification.success({
                message: "Muvaffaqiyatli!",
                description: "Talaba qo'shildi!",
                duration: 2,
            });

            setIsModalOpen(false);
            refetch();


        } catch (error) {
            console.error("Student qo‘shishda xatolik:", error);

            notification.error({
                message: "Xatolik!",
                description: "Talaba qo'shilmadi. Qayta urinib ko'ring!",
                duration: 3,
            });
        }
    };


    <AddStudentModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
    />


    return (
        <div className="fullContainer">
            <SidebarLayout>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", background: "#f5f7fa", borderBottom: "2px solid #d9e0ea" }}>
                    <div style={{ display: "flex", gap: "15px", alignItems: "center", width: "100%" }}>
                        <span style={{ color: "#1677ff", fontWeight: "bold", borderBottom: "2px solid #1677ff", cursor: "pointer" }}>
                            All Students
                        </span>
                        <span style={{ color: "#8c8c8c", cursor: "pointer" }}>Archive</span>

                        {showSearch && (
                            <Input
                                autoFocus
                                placeholder="Search..."
                                prefix={<SearchOutlined />}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onBlur={() => setShowSearch(false)}
                                style={{ width: 200, marginLeft: "auto", marginRight: "10px" }}
                            />
                        )}
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        {!showSearch && (
                            <Button className="!text-blue-600 border !border-blue-600 !bg-transparent" icon={<SearchOutlined className="!text-blue-600" />} onClick={() => setShowSearch(true)} />
                        )}
                        <Button className="!text-blue-600 border !border-blue-600 !bg-transparent" icon={<FilterOutlined className="!text-blue-600" />}>Filters</Button>
                        <Button type="primary" icon={<UserAddOutlined className="!text-white" />} onClick={showModal}>New Student</Button>
                    </div>
                </div>

                {/* Jadval qismi */}


                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="id"
                    className="cursor-pointer"
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: data?.total || 0,
                        onChange: (page) => setCurrentPage(page),
                        showSizeChanger: false,
                    }}
                    onRow={(record: any) => ({
                        onClick: () => navigate(`/clients-deteils/${record.id}`),
                    })}
                />


                {/* Modal */}
                <AddStudentModal
                    visible={isModalOpen}
                    onClose={handleCancel}
                    onSubmit={handleSubmit}
                />

            </SidebarLayout>
        </div>
    );
}
