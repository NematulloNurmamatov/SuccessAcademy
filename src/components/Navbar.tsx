import { Layout, Avatar, Dropdown, MenuProps, message } from "antd";
import { FaBell } from "react-icons/fa";
import img from "../assets/Layer_40_copy.png";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../store/store";
import { useGetUserQuery } from "../services/Service";
import { ThreeDot } from "react-loading-indicators";

const { Header } = Layout;

export default function Navbar() {
    const navigate = useNavigate();
    // const auth = useSelector((state: RootState) => state); // ✅ Redux-dan state olish
    // console.log(auth);

    const { data, isLoading } = useGetUserQuery({});

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
        <Header className="sticky top-0 z-10 !bg-white shadow-md px-6 py-2">
            <div className="container flex justify-between items-center">
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
                    {isLoading ? (
                        <span><ThreeDot color="#4e31cc" size="small" text="" textColor="" /> </span>
                    ) : (
                        data && (
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
                        )
                    )}
                </div>
            </div>
        </Header>
    );
}
