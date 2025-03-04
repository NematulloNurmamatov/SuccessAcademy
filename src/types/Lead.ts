// export interface Lead {
//     id: number;
//     phone: string;
//     lesson_type_display?: string;
//     source_display?: string;
//     created_at: string;
//     lesson_time?: string;
//     status_display: string;
//     first_name: string;
//     last_name: string;
//     teacher: string;
// }


export type Subject = {
    id: number;
    name: string;
};


export type Teacher = {
    gender_display: string;
    id: number;
    teacher_name: string;
};

export interface LeadColumnProps {
    title: string;
    leads: Lead[];
    refetch: () => void;
}


export interface Lead {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    status: number;
    status_display: string;
    lesson_type_display?: string;
    source_display?: string;
    created_at?: string;
    lesson_time?: string;
    teacher: string;
    source: string;
    lesson_type: string;
}
