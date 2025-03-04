// import { useState } from "react";

// interface Lead {
//     id: number;
//     phone: string;
//     lesson_type_display?: string;
//     source_display?: string;
//     created_at: string;
//     lesson_time?: string;
//     status_display: string;
// }

// interface LeadModalProps {
//     lead: Lead;
//     onClose: () => void;
// }

// export default function LeadModal({ lead, onClose }: LeadModalProps) {
//     const [phone, setPhone] = useState(lead.phone);
//     const [lessonType, setLessonType] = useState(lead.lesson_type_display || "");
//     const [source, setSource] = useState(lead.source_display || "");

//     const handleSave = () => {
//         console.log("Saved data:", { phone, lessonType, source });
//         onClose();
//     };

//     return (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//                 <h2 className="text-xl font-bold mb-4">Edit Lead</h2>
//                 <label className="block text-sm font-medium">Phone</label>
//                 <input
//                     type="text"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="w-full p-2 border rounded-md mb-3"
//                 />

//                 <label className="block text-sm font-medium">Lesson Type</label>
//                 <input
//                     type="text"
//                     value={lessonType}
//                     onChange={(e) => setLessonType(e.target.value)}
//                     className="w-full p-2 border rounded-md mb-3"
//                 />

//                 <label className="block text-sm font-medium">Source</label>
//                 <input
//                     type="text"
//                     value={source}
//                     onChange={(e) => setSource(e.target.value)}
//                     className="w-full p-2 border rounded-md mb-3"
//                 />

//                 <div className="flex justify-end space-x-2 mt-4">
//                     <button onClick={onClose} className="bg-gray-400 px-4 py-2 rounded-md text-white">
//                         Cancel
//                     </button>
//                     <button onClick={handleSave} className="bg-blue-600 px-4 py-2 rounded-md text-white">
//                         Save
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }
