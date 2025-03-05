import { Layout, Avatar, Dropdown, MenuProps, message, Input } from "antd";
import { FaBell, FaSearch } from "react-icons/fa";
import img from "../assets/Layer_40_copy.png";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../store/store";
import { useGetUserQuery } from "../services/Service";
import { ThreeDot } from "react-loading-indicators";
import { SearchOutlined } from "@ant-design/icons";

const { Header } = Layout;

export default function Navbar() {
    const navigate = useNavigate();
    // const auth = useSelector((state: RootState) => state); // ✅ Redux-dan state olish
    // console.log(auth);

    const { data, isLoading } = useGetUserQuery({});

    const handleLogout = async () => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user_id");
            localStorage.removeItem("user_role");

            message.success("You have logged out successfully!");
            navigate("/login");
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
        <Header className="sticky top-0 z-10 !bg-white shadow-md px-6 py-2">
            <div className="container flex justify-between items-center">
                <div className="text-xl font-semibold text-blue-600">
                    <img src={img} alt="Logo" />
                </div>

                <div className="relative w-72">
                    {/* Search ikonkasi */}
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

                    {/* Input */}
                    <Input
                        placeholder="Search..."
                        allowClear
                        size="large"
                        prefix={<SearchOutlined className="text-gray-400" />}
                        className="w-72"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <FaBell className="text-xl cursor-pointer text-gray-600 hover:text-blue-500" />
                    {isLoading ? (
                        <span><ThreeDot color="#4e31cc" size="small" text="" textColor="" /> </span>
                    ) : (
                        data ? (
                            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                                <div className="flex items-end mt-[-20px] cursor-pointer">
                                    <Avatar src={data.profile_photo} size="large">
                                        {data.first_name ? data.first_name[0].toUpperCase() : "N"}
                                    </Avatar>
                                    <div className="ml-2 items-center flex flex-col">
                                        <div className="font-medium text-blue-600">
                                            {data.last_name}.{data.first_name?.charAt(0).toUpperCase()}
                                        </div>
                                        <p className="text-sm mt-[-23px] text-gray-500">
                                            {data.user?.user_role}
                                        </p>
                                    </div>
                                </div>
                            </Dropdown>
                        ) : (
                            <span className="flex mt-[0px] items-center gap-2 text-gray-500">
                                <Avatar size="large">N</Avatar>
                                <div className="mt-[-20px]">
                                    <div className="font-medium text-gray-600">Noma'lum</div>
                                    <p className="text-sm text-gray-500 mt-[-23px]">Rol mavjud emas</p>
                                </div>
                            </span>
                        )
                    )}
                </div>

            </div>
        </Header>
    );
}
