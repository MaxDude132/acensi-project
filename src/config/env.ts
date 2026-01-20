// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/'
export const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000

// App Configuration
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'EUR/USD Converter'
export const COMPANY_NAME = import.meta.env.VITE_COMPANY_NAME || 'Maxime Toussaint'
export const APP_DESCRIPTION = import.meta.env.VITE_APP_DESCRIPTION || 'A modern web application'

// Feature Flags
export const ENABLE_DEV_TOOLS = import.meta.env.DEV
