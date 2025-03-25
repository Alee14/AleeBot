'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchWithAuth } from '@/utils/api';

export default function Home() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        url: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if token and API URL exist
        const token = localStorage.getItem('token');
        const apiUrl = localStorage.getItem('apiUrl');

        if (token && apiUrl) {
            // Verify token is still valid
            fetchWithAuth('/api/servers')
                .then(response => {
                    if (response.ok) {
                        router.push('/guilds');
                    } else {
                        // Clear invalid token
                        localStorage.removeItem('token');
                        localStorage.removeItem('apiUrl');
                        setLoading(false);
                    }
                })
                .catch(() => {
                    // Error means token is invalid or other issue
                    localStorage.removeItem('token');
                    localStorage.removeItem('apiUrl');
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [router]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${formData.url}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Save token and API URL to localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('apiUrl', formData.url);

            // Redirect to guilds page
            router.push('/guilds');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <main className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </main>
        );
    }

    return (
        <main className="flex flex-col space-y-5 justify-center items-center h-screen">
            <h1 className="text-4xl font-medium">AleeBot</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    name="url"
                    type="url"
                    placeholder="API URL"
                    required
                    value={formData.url}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:bg-blue-300"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </main>
    );
}
