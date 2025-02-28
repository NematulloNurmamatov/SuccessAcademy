interface Lead {
    id: number;
    phone: string;
    lesson_type_display: string;
    source_display: string;
    created_at: string;
    lesson_time?: string;
}

interface LeadColumnProps {
    title: string;
    leads: Lead[];
}

export default function LeadColumn({ title, leads }: LeadColumnProps) {
    return (
        <div className="bg-gray-200 shadow-lg rounded-lg p-4 flex flex-col">
            <h2 className="bg-blue-600 text-white cursor-pointer text-center py-2 rounded-md font-semibold">
                {title}
            </h2>
            <div className="flex-1 space-y-4 mt-4">
                {leads.length > 0 ? leads.map((lead) => (
                    <div
                        key={lead.id}
                        className="bg-white p-3 cursor-pointer rounded-lg shadow-md space-y-1 text-sm 
                                    transition-all duration-300 transform hover:scale-102 hover:shadow-xl"
                    >
                        <h3 className="text-blue-600 font-semibold break-all">{lead.phone}</h3>
                        <p className="text-gray-500">📞 {lead.phone}</p>
                        <p className="text-gray-400 text-sm">👤 Type: {lead.lesson_type_display}</p>
                        <p className="text-gray-400 text-sm">📲 Source: {lead.source_display}</p>
                        <p className="text-gray-400 text-sm">📅 Date: {new Date(lead.created_at).toLocaleDateString()}</p>
                        {lead.lesson_time && <p className="text-gray-400 text-sm">⏰ Time: {lead.lesson_time}</p>}
                    </div>
                )) : <p className="text-gray-400 text-center">No leads</p>}
            </div>
        </div>
    );
} 
