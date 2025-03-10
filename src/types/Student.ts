export interface Branch {
    id: number;
    name: string;
}

export interface Subject {
    id: number;
    name: string;
}

export interface Level {
    id: number;
    name: string;
}

export interface Employee {
    id: number;
    teacher_name: string;
}

export interface StartTime {
    id: number;
    start_time: string;
}

export interface Group {
    id: number;
    name: string;
}

export interface AddStudentModalProps {
    // id: number
    visible: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
}
// interface AddStudentModalProps {
//     visible: boolean;
//     onClose: () => void;
//     onSubmit: (values: any) => void; // BU YERDA PROPSNI OLISH KERAK
// }
