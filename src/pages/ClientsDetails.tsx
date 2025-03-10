import { useParams } from "react-router-dom";
import SidebarLayout from "../layouts/SidebarLayout";
import bgImg from "../assets/download.png";
import { useGetClientByIdQuery } from "../services/Service";
import { ThreeDot } from "react-loading-indicators";

export default function ClientsDetails() {
    const { id } = useParams();

    const { data: client, isLoading, error } = useGetClientByIdQuery(id);



    if (isLoading) return <SidebarLayout><p className="flex justify-center"><ThreeDot color="#4e31cc" size="large" text="" textColor="" /></p></SidebarLayout>;
    if (error || !client) return <SidebarLayout><p>Error loading client details.</p></SidebarLayout>;

    return (
        <SidebarLayout>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div
                    className="relative text-white p-6 hover:shadow-xl duration-300 hover:scale-101 cursor-pointer rounded-xl flex flex-col md:flex-row items-center md:items-start gap-4"
                    style={{
                        background: `url(${bgImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-gray-700">
                        ?
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-semibold">{client.full_name}</h2>
                        <p className="text-lg">{client.role || "Student"}</p>
                        <span className="bg-green-500 text-white px-3 py-1 rounded-lg">
                            {client.status}
                        </span>
                    </div>
                    <div className="md:ml-auto text-center md:text-right">
                        <p className="text-lg">Current balance:</p>
                        <p className="text-2xl font-bold">{client.balance?.toLocaleString()} so’m</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    {["Points", "Active courses", "Amount to be paid", "Debt for this month"].map((title, index) => (
                        <div
                            key={index}
                            className="bg-white text-gray-700 duration-300 hover:scale-101 cursor-pointer hover:shadow-lg p-4
                            sm:p-6 rounded-md shadow-md flex flex-col items-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:text-white"
                        >
                            <h3 className="text-lg font-semibold">{title}</h3>
                            <p className="text-2xl font-bold">0 so’m</p>
                        </div>


                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer hover:scale-101 duration-300">
                        <h3 className="text-lg font-semibold">Contacts</h3>
                        <p><strong>Phone:</strong> {client.phone_number_1}</p>
                        <p><strong>Birthday:</strong> {client.birthday}</p>
                        <p><strong>Gender:</strong> {client.gender_display || "Tanlanmagan"}</p>
                        <p><strong>Age:</strong> {client.get_age || "Tanlanmagan"}</p>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer hover:scale-101 duration-300">
                        <h3 className="text-lg font-semibold">Lead informations</h3>
                        <p><strong>Subject:</strong> Tanlanmagan</p>
                        <p><strong>Lesson type:</strong>Tanlanmagan</p>
                        <p><strong>Teacher:</strong> Tanlanmagan</p>
                        <p><strong>Lesson time:</strong> Tanlanmagan</p>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}