import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor to include auth token in requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('meraki_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authApi = {
    login: (credentials) => api.post('/users/login', credentials),
    register: (userData) => api.post('/users/register', userData),
    googleLogin: (data) => api.post('/users/google', data),
};

export const userApi = {
    getMe: () => api.get('/users/me'),
    updateMe: (userData) => api.patch('/users/me', userData),
    changePassword: (passwords) => api.post('/users/security/password', passwords),
    getDashboardStats: () => api.get('/users/dashboard'),
};

export const otpApi = {
    sendOTP: (phoneNumber) => api.post('/otp/send', { phoneNumber }),
    verifyOTP: (phoneNumber, code) => api.post('/otp/verify', { phoneNumber, code }),
};

export const opportunityApi = {
    getAll: () => api.get('/opportunities'),
    getById: (id) => api.get(`/opportunities/${id}`),
    create: (data) => api.post('/opportunities', data),
    apply: (id) => api.post(`/opportunities/${id}/apply`),
    update: (id, data) => api.put(`/opportunities/${id}`, data),
    delete: (id) => api.delete(`/opportunities/${id}`),
    updateApplicantStatus: (id, userId, status) => api.patch(`/opportunities/${id}/applicants/${userId}`, { status }),
};

export const communityApi = {
    getPosts: () => api.get('/community'),
    createPost: (data) => api.post('/community', data),
    likePost: (id) => api.post(`/community/${id}/like`),
    addComment: (id, content) => api.post(`/community/${id}/comment`, { content }),
    updatePost: (id, data) => api.put(`/community/${id}`, data),
    deletePost: (id) => api.delete(`/community/${id}`),
};

export const trainingApi = {
    getEvents: () => api.get('/hub/events'),
    registerEvent: (id) => api.post(`/hub/events/${id}/register`),
    createEvent: (data) => api.post('/hub/events', data),
    updateEvent: (id, data) => api.put(`/hub/events/${id}`, data),
    deleteEvent: (id) => api.delete(`/hub/events/${id}`),
    getCourses: () => api.get('/hub/courses'),
    enrollCourse: (id) => api.post(`/hub/courses/${id}/enroll`),
    createCourse: (data) => api.post('/hub/courses', data),
    updateCourse: (id, data) => api.put(`/hub/courses/${id}`, data),
    deleteCourse: (id) => api.delete(`/hub/courses/${id}`),
};

export const donationApi = {
    getDonations: () => api.get('/donations'),
    createDonation: (data) => api.post('/donations', data),
};

export default api;
