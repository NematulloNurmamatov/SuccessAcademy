import SidebarLayout from "../layouts/SidebarLayout";
import { useState, ChangeEvent, FormEvent } from "react";
import { message } from "antd";
import { useGetUserQuery, useUpdateUserMutation } from "../services/Service";
import { ThreeDot } from "react-loading-indicators";

interface ProfileData {
    firstName: string;
    lastName: string;
    avatar: string;
}

export default function ProfilePage() {
    const { data, isLoading } = useGetUserQuery({});
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [formData, setFormData] = useState<ProfileData>({
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        avatar: data?.avatar || "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Faylni tanlash funksiyasi
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    // Formani submit qilish funksiyasi
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await updateUser(formData).unwrap();
            message.success("Profile updated successfully!");
        } catch (error) {
            message.error("Failed to update profile");
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <ThreeDot color="#4e31cc" size="small" text="" textColor="" />
        </div>;
    }

    return (
        <div className="fullContainer">
            <SidebarLayout>
                <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg mx-auto">
                    <h1 className="text-2xl font-semibold mb-4">Profile Page</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-1 block w-full p-2 border rounded-md"
                            />
                        </div>
                        {formData.avatar && (
                            <div className="mb-4">
                                <img
                                    src={formData.avatar}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                            </div>
                        )}
                        <div className="flex justify-end space-x-2">
                            <button type="button" className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md" disabled={isUpdating}>
                                {isUpdating ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            </SidebarLayout>
        </div>
    );
}
