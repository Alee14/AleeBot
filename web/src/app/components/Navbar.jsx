'use client';
import { useState, useEffect } from 'react';
import SignOut from "@/app/components/sign-out";
import Link from "next/link";
import { fetchWithAuth } from '@/utils/api';

export default function Navbar() {
    const [versionInfo, setVersionInfo] = useState({
        ab_version: 'Loading...',
        api_version: 'Loading...'
    });
    const [uptime, setUptime] = useState('Loading...');

    useEffect(() => {
        // Get the API URL
        const apiUrl = localStorage.getItem('apiUrl');
        if (!apiUrl) return;

        // Fetch version information - no auth required
        fetch(`${apiUrl}/api/version`)
            .then(response => response.json())
            .then(data => {
                setVersionInfo({
                    ab_version: data.ab_version,
                    api_version: data.api_version
                });
            })
            .catch(error => {
                console.error('Failed to fetch version info:', error);
                setVersionInfo({
                    ab_version: 'Error',
                    api_version: 'Error'
                });
            });

        // Fetch uptime information - no auth required
        fetch(`${apiUrl}/api/uptime`)
            .then(response => response.json())
            .then(data => {
                // Convert milliseconds to a readable format
                const ms = data.uptime;
                const seconds = Math.floor(ms / 1000);
                const minutes = Math.floor(seconds / 60);
                const hours = Math.floor(minutes / 60);
                const days = Math.floor(hours / 24);

                let uptimeText = '';
                if (days > 0) {
                    uptimeText = `${days} day${days !== 1 ? 's' : ''}`;
                } else if (hours > 0) {
                    uptimeText = `${hours} hour${hours !== 1 ? 's' : ''}`;
                } else if (minutes > 0) {
                    uptimeText = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
                } else {
                    uptimeText = `${seconds} second${seconds !== 1 ? 's' : ''}`;
                }

                setUptime(uptimeText);
            })
            .catch(error => {
                console.error('Failed to fetch uptime:', error);
                setUptime('Error');
            });
    }, []);

    return (
        <nav className="bg-gray-900 text-white">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-medium">AleeBot</h1>
                    <ul>
                        {[
                            ['Guilds', '/guilds'],
                            ['Quotes', '/quotes'],
                        ].map(([title, url]) => (
                            <li key={title} className="inline-block mx-2">
                                <Link href={url}>
                                    {title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center space-x-4">
                    <span>Uptime: {uptime}</span>
                    <span>API v{versionInfo.api_version}</span>
                    <span>{versionInfo.ab_version}</span>
                    <SignOut />
                </div>
            </div>
        </nav>
    );
}
