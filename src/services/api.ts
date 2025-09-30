import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API service functions
export const apiService = {
  // Authentication
  auth: {
    login: (username: string, password: string) =>
      api.post('/auth/token/', { username, password }),
    logout: () => {
      localStorage.removeItem('auth_token')
    },
    getToken: () => localStorage.getItem('auth_token'),
    setToken: (token: string) => localStorage.setItem('auth_token', token),
  },

  // Companies
  companies: {
    list: (params?: any) => api.get('/companies/', { params }),
    get: (id: string) => api.get(`/companies/${id}/`),
    create: (data: any) => api.post('/companies/', data),
    update: (id: string, data: any) => api.put(`/companies/${id}/`, data),
    delete: (id: string) => api.delete(`/companies/${id}/`),
    search: (params: any) => api.get('/companies/search/', { params }),
    fullAnalysis: (id: string) => api.get(`/companies/${id}/full_analysis/`),
  },

  // Analyses
  analyses: {
    list: (params?: any) => api.get('/analyses/', { params }),
    get: (id: string) => api.get(`/analyses/${id}/`),
    create: (data: any) => api.post('/analyses/', data),
    update: (id: string, data: any) => api.put(`/analyses/${id}/`, data),
    delete: (id: string) => api.delete(`/analyses/${id}/`),
    recent: () => api.get('/analyses/recent/'),
    complete: (id: string) => api.post(`/analyses/${id}/complete/`),
  },

  // Leads
  leads: {
    list: (params?: any) => api.get('/leads/', { params }),
    get: (id: string) => api.get(`/leads/${id}/`),
    create: (data: any) => api.post('/leads/', data),
    update: (id: string, data: any) => api.put(`/leads/${id}/`, data),
    delete: (id: string) => api.delete(`/leads/${id}/`),
    updateStatus: (id: string, status: string) => 
      api.post(`/leads/${id}/update_status/`, { status }),
  },

  // Investments
  investments: {
    list: (params?: any) => api.get('/investments/', { params }),
    get: (id: string) => api.get(`/investments/${id}/`),
    create: (data: any) => api.post('/investments/', data),
    update: (id: string, data: any) => api.put(`/investments/${id}/`, data),
    delete: (id: string) => api.delete(`/investments/${id}/`),
  },

  // Dashboard
  dashboard: {
    stats: () => api.get('/dashboard/stats/'),
    recentAnalyses: () => api.get('/dashboard/recent_analyses/'),
    upcomingTasks: () => api.get('/dashboard/upcoming_tasks/'),
  },

  // User Profile
  profile: {
    get: () => api.get('/profiles/me/'),
    update: (data: any) => api.put('/profiles/me/', data),
  },
}

export default api
