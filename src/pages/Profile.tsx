import SidebarLayout from "../layouts/SidebarLayout";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { getUser } from "../services/auth";
import { message } from "antd";

interface ProfileData {
    firstName: string;
    lastName: string;
    avatar: string;
}

export default function ProfilePage() {
    const [formData, setFormData] = useState<ProfileData>({
        firstName: "",
        lastName: "",
        avatar: ""
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userData = await getUser();
                if (userData) {
                    setFormData({
                        firstName: userData.firstName || "",
                        lastName: userData.lastName || "",
                        avatar: userData.avatar || ""
                    });
                }
            } catch (error) {
                console.error(error);
                message.error("Failed to load profile data");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("first_name", formData.firstName);
        data.append("last_name", formData.lastName);
        if (selectedFile) {
            data.append("profile_photo", selectedFile);
        }

        // 🔍 Tokenni olish
        const token = localStorage.getItem("token"); // Local storage ichida borligini tekshirish
        if (!token) {
            message.error("Authentication token missing. Please log in again.");
            return;
        }

        try {
            const response = await fetch("https://test.api.mydays.uz/api/v1/user/me/", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: data,
            });

            const result = await response.json();
            if (response.ok) {
                message.success("Profile updated successfully!");
                setFormData({
                    ...formData,
                    avatar: result.avatar,
                });
            } else {
                message.error(result.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Request failed:", error);
            message.error("An error occurred while updating profile");
        }
    };


    if (loading) return <div>Loading...</div>;

    return (
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
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
                    </div>
                </form>
            </div>
        </SidebarLayout>
    );
}
