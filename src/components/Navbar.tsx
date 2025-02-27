import { Layout, Avatar, Dropdown, MenuProps, message } from "antd";
import { FaBell } from "react-icons/fa";
import img from "../assets/Layer_40_copy.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const { Header } = Layout;

interface UserProfile {
    first_name: string;
    last_name: string;
    profile_photo: string;
    user: {
        id: number
        user_role: string
        username: string
    }
}

export default function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch("https://test.api.mydays.uz/api/v1/user/me/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            localStorage.removeItem("token");
            message.success("You have logged out successfully!");
            navigate("/");
        } catch (error) {
            message.error("Logout failed. Please try again later.");
        }
    };

    const menuItems: MenuProps["items"] = [
        { key: "1", label: "Profile", onClick: () => navigate("/profile") },
        { key: "2", label: "Settings", onClick: () => console.log("Settings clicked") },
        { key: "3", label: "Logout", danger: true, onClick: handleLogout },
    ];

    return (
        <Header className="flex sticky top-0 z-10 justify-between items-center !bg-white shadow-md px-6 py-2">
            <div className="text-xl font-semibold text-blue-600">
                <img src={img} alt="Logo" />
            </div>

            <div className="relative w-72">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full h-10 pl-10 pr-4 border rounded-lg focus:outline-none border-gray-300 p-2 bg-gray-100 focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex items-center gap-4">
                <FaBell className="text-xl cursor-pointer text-gray-600 hover:text-blue-500" />
                {loading ? (
                    <span>Loading...</span>
                ) : (
                    <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                        <div className="flex items-end mt-[-20px] cursor-pointer">
                            <Avatar src={user?.profile_photo} size="large">
                                {user?.first_name ? user.first_name[0].toUpperCase() : "N"}
                            </Avatar>
                            <div className="ml-2 items-center flex flex-col ">
                                <div className="font-medium text-blue-600">
                                    {user?.last_name}.{user?.first_name?.charAt(0).toUpperCase()}
                                </div>
                                <p className="text-sm mt-[-23px] text-gray-500">{user?.user?.user_role}</p>
                            </div>
                        </div>
                    </Dropdown>
                )}
            </div>
        </Header>
    );
}
