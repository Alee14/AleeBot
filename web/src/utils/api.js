// Utility for making authenticated API requests
export const fetchWithAuth = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    const apiUrl = localStorage.getItem('apiUrl');

    if (!token || !apiUrl) {
        throw new Error('Not authenticated');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
    };

    const response = await fetch(`${apiUrl}${endpoint}`, {
        ...options,
        headers
    });

    // Handle token expiration
    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/';
        throw new Error('Session expired');
    }

    return response;
};
