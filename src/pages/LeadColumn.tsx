import { useState } from "react";
import { LeadColumnProps, Lead } from "../types/Lead";
import { useUpdateLeadMutation } from "../services/Service"; // RTK Query
import { Button, Form, Input, Modal, Select } from "antd";
import { RxAvatar } from "react-icons/rx";
import { FaLink } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { IoMdTimer } from "react-icons/io";

export default function LeadColumn({ title, leads, refetch }: LeadColumnProps) {
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateLead] = useUpdateLeadMutation();

    const statusOptions = [
        { value: 0, label: "New Leads" },
        { value: 1, label: "Contacted" },
        { value: 2, label: "Trial Lesson" },
        { value: 3, label: "Summary" },
    ];

    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!selectedLead) return;

        setLoading(true);

        try {
            await updateLead({ ...selectedLead, id: selectedLead.id }).unwrap();
            console.log(selectedLead);
            refetch();
            closeModal();
        } catch (error) {
            console.error("Xatolik:", error);
        } finally {
            setLoading(false);
        }
    };


    const openEditModal = (lead: Lead) => {
        setSelectedLead(lead);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedLead(null);
    };


    return (
        <div className="bg-gray-200 shadow-lg rounded-lg p-4 flex flex-col">
            <h2 className="bg-blue-600 text-white cursor-pointer text-center py-2 rounded-md font-semibold">
                {title}
            </h2>
            <div className="flex-1 space-y-4 mt-4">
                {leads.length > 0 ? (
                    leads.map((lead) => (
                        <div
                            key={lead.id}
                            onClick={() => openEditModal(lead)}
                            className="bg-white p-3 cursor-pointer rounded-lg shadow-md space-y-1 text-sm 
                                    transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                        >
                            <h3 className="text-blue-600 font-semibold break-words">
                                {lead.first_name || lead.last_name
                                    ? `${lead.first_name || ""} ${lead.last_name || ""}`.trim()
                                    : "Noma'lum"}
                            </h3>
                            <p className="text-white bg-[#33A9FF] rounded-r-lg pl-3 -ml-3 p-1">
                                {lead.phone || "Noma'lum"}
                            </p>
                            <p className="text-gray-400 text-sm flex items-center gap-1">
                                <RxAvatar />
                                Type: {lead.lesson_type_display || "Noma'lum"}
                            </p>
                            <p className="text-gray-400 text-sm flex items-center gap-1">
                                <FaLink />
                                Source: {lead.source_display || "Noma'lum"}
                            </p>
                            <p className="text-gray-400 text-sm flex items-center gap-1">
                                <MdOutlineDateRange />
                                Date: {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : "Noma'lum"}
                            </p>
                            {
                                <p className="text-gray-400 text-sm flex items-center gap-1"><IoMdTimer />
                                    Time: {lead?.lesson_time ? lead?.lesson_time : "No'malum"}</p>
                            }
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-center">No leads</p>
                )}
            </div>

            {/* Edit Modal */}
            {isModalOpen && selectedLead && (
                <Modal
                    open={isModalOpen}
                    onCancel={closeModal}
                    footer={null}
                >
                    <p className="text-center !text-[25px] text-[#334D6E]">Lead card</p>
                    <p className="text-center !text-[14px] text-[#334D6E] mb-4">Are you sure you want to edit the lead card?</p>
                    <Form layout="vertical" onFinish={handleSave} initialValues={{
                        first_name: selectedLead.first_name,
                        last_name: selectedLead.last_name,
                        phone: selectedLead.phone,
                        status: selectedLead.status,
                        lesson_type: selectedLead.lesson_type,
                        source: selectedLead.source,
                        lesson_time: selectedLead.lesson_time,
                    }}>
                        <div className=" ">
                            <div className="grid grid-cols-2 gap-x-4">
                                <Form.Item
                                    name="first_name"
                                    label={<span className="text-[#334D6E] text-[11px]">First Name</span>}
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        value={selectedLead.first_name}
                                        onChange={(e) => setSelectedLead({ ...selectedLead, first_name: e.target.value })}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="last_name"
                                    label={<span className="text-[#334D6E] text-[11px]">Last Name</span>}
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        value={selectedLead.last_name}
                                        onChange={(e) => setSelectedLead({ ...selectedLead, last_name: e.target.value })}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    label={<span className="text-[#334D6E] text-[11px]">Phone Number</span>}
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        value={selectedLead.phone}
                                        onChange={(e) => setSelectedLead({ ...selectedLead, phone: e.target.value })}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="lesson_type"
                                    label={<span className="text-[#334D6E] text-[11px]">Lesson Type</span>}
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        value={selectedLead.lesson_type}
                                        onChange={(value) => setSelectedLead({ ...selectedLead, lesson_type: value })}
                                    >
                                        <Select.Option value="group">Group</Select.Option>
                                        <Select.Option value="individual">Individual</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    className="col-span-2"
                                    name="status"
                                    label={<span className="text-[#334D6E] text-[11px]">Status</span>}
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        value={selectedLead.status}
                                        onChange={(value) => {
                                            setSelectedLead({
                                                ...selectedLead,
                                                status: value,
                                                status_display: statusOptions.find(opt => opt.value === value)?.label || "",
                                            });
                                        }}
                                    >
                                        {statusOptions.map((option) => (
                                            <Select.Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="source"
                                    label={<span className="text-[#334D6E] text-[11px]">Source</span>}
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        value={selectedLead?.source}
                                        onChange={(value) => setSelectedLead({ ...selectedLead, source: value })}
                                    >
                                        {[
                                            { value: 0, label: "Website" },
                                            { value: 1, label: "Instagram" },
                                            { value: 2, label: "Facebook" },
                                            { value: 3, label: "Twitter" },
                                            { value: 4, label: "Recommendation" },
                                            { value: 5, label: "Friend" },
                                            { value: 6, label: "Other" },
                                        ].map((option) => (
                                            <Select.Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="lesson_time"
                                    label={<span className="text-[#334D6E] text-[11px]">Lesson Time</span>}
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        value={selectedLead?.lesson_time}
                                        onChange={(value) => setSelectedLead({ ...selectedLead, lesson_time: value })}
                                    >
                                        {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"].map((time) => (
                                            <Select.Option key={time} value={time}>
                                                {time}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <Form.Item className="flex justify-end">
                            <Button onClick={closeModal} className="mr-2">Cancel</Button>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            )}



        </div>
    );
}
