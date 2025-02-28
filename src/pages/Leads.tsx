import SidebarLayout from "../layouts/SidebarLayout";
import { useLeadListQuery } from "../services/Service";
import LeadColumn from "./LeadColumn";

// Lead tipini aniq belgilash
type Lead = {
    id: number;
    phone: string;
    lesson_type_display?: string;
    source_display?: string;
    created_at: string;
    lesson_time?: string;
    status_display: string;
};

export default function Leads() {
    const { data, isLoading } = useLeadListQuery({});

    if (isLoading) return <div className="text-center py-10">Loading...</div>;

    // leadsByStatus obyektining to‘g‘ri tipini berish
    const leadsByStatus: { [key: string]: Lead[] } = {
        "New Leads": [],
        "Contacted": [],
        "Trial Lesson": [],
        "Summary": [],
    };

    // Agar data mavjud bo'lsa, leadsByStatus ni to'ldiramiz
    if (data?.results) {
        data.results.forEach((lead: Lead) => {
            if (leadsByStatus[lead.status_display]) {
                leadsByStatus[lead.status_display].push(lead);
            }
        });
    }

    return (
        <SidebarLayout>
            <div className="!mb-8">
                <h1 className="text-2xl font-bold mb-4">Board of Leads</h1>
                <div className="grid bg-white rounded-lg p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(leadsByStatus).map(([status, leads]: any) => (
                        <LeadColumn key={status} title={status} leads={leads} />
                    ))}
                </div>
            </div>
        </SidebarLayout>
    );
}
