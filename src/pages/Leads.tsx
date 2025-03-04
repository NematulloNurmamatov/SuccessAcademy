import { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import SidebarLayout from "../layouts/SidebarLayout";
import { useGetSubjectQuery, useGetTeacherQuery, useLeadCreateMutation, useLeadListQuery } from "../services/Service";
import LeadColumn from "./LeadColumn";
import { useNavigate } from "react-router-dom";
import { Lead, Subject, Teacher } from "../types/Lead";



export default function Leads() {
    const { data: leadsData, refetch } = useLeadListQuery({});
    const { data: subjectsData } = useGetSubjectQuery({});
    const { data: teachersData } = useGetTeacherQuery({});

    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    const [createLead, { isLoading: isCreating }] = useLeadCreateMutation({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const leadsByStatus: { [key: string]: Lead[] } = {
        "New Leads": [],
        "Contacted": [],
        "Trial Lesson": [],
        "Summary": [],
    };

    if (leadsData?.results) {
        leadsData.results.forEach((lead: Lead) => {
            if (leadsByStatus[lead.status_display]) {
                leadsByStatus[lead.status_display].push(lead);
            }

        });
    }

    useEffect(() => {
        if (subjectsData) {
            setSubjects(subjectsData);
        }
    }, [subjectsData,]);

    useEffect(() => {
        if (teachersData) {
            setTeachers(teachersData);
        }
    }, [teachersData]);

    const showModal = () => {
        setIsModalOpen(true);
        
    };

    const handleCancel = () => setIsModalOpen(false);


    const handleCreateLead = async (values: any) => {
        console.log("Formdan kelgan ma'lumotlar:", values);

        try {
            await createLead({
                first_name: values.first_name,
                last_name: values.last_name,
                phone: values.phone,
                teacher: values.teacher,
                subject: values.subject,
                // // lesson_type: parseInt(values.lesson_type), // Raqamga o‘girildi
                // source: parseInt(values.source), // Raqamga o‘girildi
            }).unwrap();
            navigate("/leads");
            console.log("Lead muvaffaqiyatli qo‘shildi!");
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }
        refetch()
    };



    return (
        <div className="fullContainer">
            <SidebarLayout>
                <div className="!mb-8">
                    <h1 className="text-2xl font-bold mb-4">Board of Leads</h1>
                    <div className="flex justify-end mb-4">
                        <Button onClick={showModal} type="primary">New Lead</Button>
                    </div>

                    <div className="grid bg-white rounded-lg p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {Object.entries(leadsByStatus).map(([status, leads]: any) => (
                            <LeadColumn key={status} title={status} leads={leads} refetch={refetch} />
                        ))}
                    </div>
                </div>

                {/* Modal */}
                <Modal
                    title="Create New Lead"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form form={form} layout="vertical" onFinish={handleCreateLead}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="teacher" label="Teacher" rules={[{ required: true }]}>
                                    <Select>
                                        {teachers.map((teacher: Teacher) => (
                                            <Select.Option key={teacher.id} value={teacher.id}>{teacher.teacher_name}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item name="last_name" label="Last Name" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
                                    <Select>
                                        {subjects.map((subject: Subject) => (
                                            <Select.Option key={subject.id} value={subject.id}>{subject.name}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item className="flex justify-end">
                            <Button type="primary" htmlType="submit" loading={isCreating}>
                                Save Lead
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </SidebarLayout>
        </div>
    );
}
