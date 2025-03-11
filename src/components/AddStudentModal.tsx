import { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, DatePicker, Radio, InputNumber, Table } from "antd";
import {
    useGetSubjectsQuery,
    useGetBranchesQuery,
    useGetCourseLevelsQuery,
    useGetEmployeesQuery,
    useGetStartTimesQuery,
    useGetGroupsQuery
} from "../services/Service";
import { AddStudentModalProps, Branch, Employee, Group, Level, StartTime, Subject } from "../types/Student";
import dayjs from "dayjs";
import "../styles/index.css";

const AddStudentModal: React.FC<AddStudentModalProps> = ({ visible, onClose, onSubmit }) => {


    // const [selectedGroup, setSelectedGroup] = useState(null);
    const [search, setSearch] = useState("");

    const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

    const columns = [
        {
            title: "Group Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Teacher",
            dataIndex: "teacher",
            key: "teacher",
        },
        {
            title: "Start Date",
            dataIndex: "start_date",
            key: "start_date",
        },
    ];




    const [step, setStep] = useState(1);
    const [form] = Form.useForm();
    const [branchId, setBranchId] = useState<number | null>(null);
    const [subjectId, setSubjectId] = useState<number | null>(null);
    const [lessonType, setLessonType] = useState<string>("individual");
    const [formData, setFormData] = useState({});

    const { data: branchData, isLoading: branchesLoading } = useGetBranchesQuery({});
    const { data: subjectData, isLoading: subjectsLoading } = useGetSubjectsQuery(branchId, { skip: !branchId });
    const { data: levelData, isLoading: levelsLoading } = useGetCourseLevelsQuery(subjectId, { skip: !subjectId });
    const { data: employeeData, isLoading: employeesLoading } = useGetEmployeesQuery(branchId, { skip: !branchId });
    const { data: startTimeData, isLoading: startTimesLoading } = useGetStartTimesQuery({});
    const { data: groupData, isLoading: groupsLoading } = useGetGroupsQuery({});

    const branches: Branch[] = Array.isArray(branchData?.results) ? branchData.results : [];
    const subjects: Subject[] = subjectData || [];
    const levels: Level[] = Array.isArray(levelData) ? levelData : levelData?.results || [];
    const employees: Employee[] = employeeData || [];
    const startTimes: StartTime[] = startTimeData || [];
    const groups: Group[] = groupData || [];

    const handleSelectGroup = (groupId: number) => {
        setSelectedGroup(groupId);
        form.setFieldsValue({ group_id: groupId }); // Formani yangilash
        console.log("Tanlangan group_id:", groupId);
    };




    useEffect(() => {
        if (!branchId && branches.length > 0) {
            setBranchId(branches[0].id);
        }
    }, [branches]);

    useEffect(() => {
        if (branchId) setSubjectId(null);
    }, [branchId]);

    const handleCancel = () => {
        form.resetFields();
        setBranchId(null);
        setSubjectId(null);
        setStep(1);
        onClose();
    };

    return (

        <Modal
            title={null}
            open={visible}
            onCancel={handleCancel}
            footer={null}
            width={550}
            className="max-h-[70vh] rounded-md overflow-y-auto [&::-webkit-scrollbar]:hidden"

        >
            <div className="overflow-hidden">
                <h2 className="text-[25px] text-center text-[#334D6E] mb-4">
                    {step === 1 ? (
                        <>
                            Add new Student <br /> <span className="text-[14px]">Add or move selected students to a new group</span>
                        </>
                    ) : (
                        <><span className="text-[20px]">Add selected students</span></>
                    )}
                </h2>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        if (step === 1) {
                            setFormData({ ...formData, ...values });
                            setStep(2);
                        } else {
                            onSubmit({ ...formData, ...values });
                            handleCancel();
                        }
                    }}
                >
                    {step === 1 ? (
                        <div className="grid grid-cols-2 gap-x-4">
                            <Form.Item label="First Name" name="first_name" rules={[{ required: true, message: "Required!" }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Last Name" name="last_name">
                                <Input />
                            </Form.Item>

                            <Form.Item label="Phone Number" name="phone_number_1" rules={[{ required: true, message: "Required!" }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Tug‘ilgan sana"
                                name="birthday"
                                rules={[{ required: true, message: "Tug‘ilgan sanani kiriting!" }]}
                                getValueProps={(value) => ({
                                    value: value ? dayjs(value, "YYYY-MM-DD") : null
                                })}
                                normalize={(value) => (value ? value.format("YYYY-MM-DD") : null)}
                            >
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    className="w-full"
                                    disabledDate={(current) => current && current > dayjs().endOf("day")}
                                />
                            </Form.Item>

                            <div className="col-span-2 flex justify-end">
                                <Button type="primary" htmlType="submit">Next</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-x-4">
                            <Form.Item label="Branch" name="branch" rules={[{ required: true }]}>
                                <Select onChange={setBranchId} loading={branchesLoading}>
                                    {
                                        branches.map(branch => <Select.Option key={branch.id} value={branch.id}>{branch?.name}</Select.Option>)
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item label="Subject" name="subject" rules={[{ required: true }]}>
                                <Select onChange={setSubjectId} loading={subjectsLoading}>
                                    {
                                        subjects.map(subject => <Select.Option key={subject.id} value={subject.id}>{subject.name}</Select.Option>)
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item label="Course Level" name="level" rules={[{ required: true }]}>
                                <Select loading={levelsLoading} disabled={!subjectId}>
                                    {
                                        levels.map(level => <Select.Option key={level.id} value={level.id}>{level.name}</Select.Option>)
                                    } </Select>
                            </Form.Item>

                            <Form.Item label="Teacher" name="teacher" rules={[{ required: true }]}>
                                <Select loading={employeesLoading} disabled={!branchId}>
                                    {
                                        employees.map(employee =>
                                            <Select.Option key={employee.id} value={employee.id}>
                                                {employee.teacher_name}
                                            </Select.Option>)
                                    } </Select>
                            </Form.Item>

                            <Form.Item label="Start Time" name="start_time">
                                <Select loading={startTimesLoading}>
                                    {
                                        startTimes.map(time => <Select.Option key={time.id} value={time.id}>{time.start_time}</Select.Option>)
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item label="Select Days" name="days">
                                <Select>
                                    <Select.Option value="odd">Toq kunlar</Select.Option>
                                    <Select.Option value="even">Juft kunlar</Select.Option>
                                </Select>
                            </Form.Item>


                            <Input.Search
                                placeholder="Search group"
                                onChange={(e) => setSearch(e.target.value)}
                                className="mb-2 col-span-2"
                            />

                            <Table
                                columns={columns}
                                dataSource={groups.filter(group =>
                                    group.name.toLowerCase().includes(search.toLowerCase())
                                )}
                                loading={groupsLoading}
                                rowKey="id"
                                scroll={{ y: 300 }}
                                bordered
                                className="col-span-2"
                                rowClassName={(record) =>
                                    selectedGroup === record.id ? "bg-blue-200 border border-blue-500" : ""
                                }
                                onRow={(record) => ({
                                    onClick: () => handleSelectGroup(record.id),
                                    style: {
                                        cursor: "pointer",
                                    },
                                })}
                            />

                            <Form.Item name="group_id" hidden>
                                <Input />
                            </Form.Item>


                            <Form.Item label="Monthly Discount" name="monthly_discount">
                                <InputNumber min={0} max={1000000} defaultValue={0} className="!w-full" />
                            </Form.Item>


                            <Form.Item
                                label="Boshlanish sanasi"
                                name="start_date"
                                rules={[{ required: true, message: "Boshlanish sanasini kiriting!" }]}
                                getValueProps={(value) => ({
                                    value: value ? dayjs(value, "YYYY-MM-DD") : null
                                })}
                                normalize={(value) => (value ? value.format("YYYY-MM-DD") : null)}
                            >
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    className="w-full"
                                    placeholder="Sanani tanlang"
                                    disabledDate={(current) => current && current < dayjs().startOf("day")}
                                />
                            </Form.Item>


                            <Form.Item className="col-span-2" label="Select type of lesson" name="group_type">
                                <Radio.Group value={lessonType} onChange={(e) => setLessonType(e.target.value)} className="!flex w-full justify-between gap-4">
                                    <Radio value="individual">Individual lesson</Radio>
                                    <Radio className="" value="group">Group lesson</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <div className="col-span-2 flex justify-between">
                                <Button onClick={() => setStep(1)}>Back</Button>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </Modal>
    )
};

export default AddStudentModal;
