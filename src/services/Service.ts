import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiClient = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://test.api.mydays.uz",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        Login: builder.mutation({
            query: (data) => ({
                url: "auth/login/",
                method: "POST",
                body: data,
            }),
        }),

        GetUser: builder.query({
            query: () => ({
                url: "/api/v1/user/me/",
            }),
        }),

        GetSubject: builder.query({
            query: () => ({
                url: "/api/v1/course/subject-select",
                method: "GET",
            }),
        }),

        GetTeacher: builder.query({
            query: () => ({
                url: "/api/v1/employee/select-list",
                method: "GET",
            }),
        }),

        GetClientList: builder.query({
            query: ({ page, size }) => ({
                url: `/api/v1/student/list/?page=${page}&size=${size}`,
                method: "GET",
            }),
        }),


        getBranches: builder.query({
            query: () => "/api/v1/branch/",
        }),

        getSubjects: builder.query({
            query: (branchId) => `/api/v1/course/subject-select?branch=${branchId}`,
        }),


        getCourseLevels: builder.query({
            query: (subjectId) => `/api/v1/course/${subjectId}/level`,
        }),
        getEmployees: builder.query({
            query: (branchId) => `/api/v1/employee/select-list?branch=${branchId}`,
        }),


        getStartTimes: builder.query({
            query: () => `/api/v1/group/start-times`,
        }),
        getGroups: builder.query({
            query: () => `/api/v1/group/group-select`,
        }),

        getClientById: builder.query({
            query: (id) => `/api/v1/student/profile/${id}/`,
        }),


        UpdateUser: builder.mutation({
            query: (data) => ({
                url: "/api/v1/user/me/",
                method: "PUT",
                body: data,
            }),
        }),

        UpdateLead: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/api/v1/lead/${id}/`,
                method: "PUT",
                body: data,
            }),
        }),


        LeadList: builder.query({
            query: () => ({
                url: "/api/v1/lead/list/",
            }),
        }),

        LeadCreate: builder.mutation({
            query: (data) => ({

                url: "/api/v1/lead/create/",
                method: "POST",
                body: {
                    first_name: data.first_name || "No'malum",
                    last_name: data.last_name || "No'malum",
                    phone: data.phone,
                    teacher: data.teacher,
                    note: data.note || "No'malum",
                    lesson_type: data.lessonType,
                    source: data.source,
                    lesson_time: data.lessonTime || null,
                },
            }),
        }),

        createStudent: builder.mutation({
            query: (studentData) => ({
                url: "/api/v1/student/create/",
                method: "POST",
                body: studentData,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),


    }),
});

export const {
    useLoginMutation,
    useGetUserQuery,
    useUpdateUserMutation,
    useLeadListQuery,
    useLeadCreateMutation,
    useGetSubjectQuery,
    useGetTeacherQuery,
    useUpdateLeadMutation,
    useGetClientListQuery,
    useCreateStudentMutation,
    useGetSubjectsQuery,
    useGetBranchesQuery,
    useGetCourseLevelsQuery,
    useGetEmployeesQuery,
    useGetStartTimesQuery,
    useGetGroupsQuery,
    useGetClientByIdQuery
} = ApiClient;
