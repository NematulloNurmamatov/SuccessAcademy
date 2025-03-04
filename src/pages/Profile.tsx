import SidebarLayout from "../layouts/SidebarLayout";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { message } from "antd";
import { useGetUserQuery, useUpdateUserMutation } from "../services/Service";
import { ThreeDot } from "react-loading-indicators";
import { ProfileData } from "../types/Profile";

export default function ProfilePage() {
    const { data, isLoading } = useGetUserQuery({});
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [formData, setFormData] = useState<ProfileData>({
        first_name: "",
        last_name: "",
        profile_photo: "",
    });

    useEffect(() => {
        if (data) {
            setFormData({
                first_name: data.first_name || "",
                last_name: data.last_name || "",
                profile_photo: data.profile_photo || "",
            });
        }
    }, [data]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFile(file);

            setFormData({
                ...formData,
                profile_photo: URL.createObjectURL(file),
            });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const updatedData = new FormData();
            updatedData.append("first_name", formData.first_name);
            updatedData.append("last_name", formData.last_name);
            if (selectedFile) {
                updatedData.append("profile_photo", selectedFile);
            }

            const response = await updateUser(updatedData).unwrap();
            console.log("Serverdan qaytgan ma'lumot:", response);

            setFormData({
                first_name: response.first_name,
                last_name: response.last_name,
                profile_photo: response.profile_photo, 
            });

            message.success("Profile updated successfully!");
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
            message.error("Failed to update profile");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ThreeDot color="#4e31cc" size="small" text="" textColor="" />
            </div>
        );
    }

    return (
        <div className="fullContainer">
            <SidebarLayout>
                <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg mx-auto">
                    <h1 className="text-2xl font-semibold mb-4">Profile Page</h1>
                    <form onSubmit={handleSubmit}>
                        {
                            formData.profile_photo && (
                                <div className="mb-4">
                                    <img
                                        src={selectedFile ? URL.createObjectURL(selectedFile) : `${formData.profile_photo}?t=${new Date().getTime()}`}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full object-cover"
                                    />
                                </div>
                            )
                        }
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-600 rounded-md outline-0"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-600 rounded-md outline-0"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-1 block w-full p-2 border border-gray-600 rounded-md outline-0"
                            />
                        </div>


                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-300 rounded-md"
                                onClick={() =>
                                    setFormData({
                                        first_name: data?.first_name || "",
                                        last_name: data?.last_name || "",
                                        profile_photo: data?.profile_photo || "",
                                    })
                                }
                            >
                                Cancel
                            </button>
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
