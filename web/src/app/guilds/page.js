'use client';
import { useState, useEffect } from "react";
import { fetchWithAuth } from "@/utils/api";
import Link from "next/link";
import Card from "@/app/components/Card";
import Navbar from "@/app/components/Navbar";

export default function Guilds() {
    const [guilds, setGuilds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [clientId, setClientId] = useState(null);
    const [selectedGuild, setSelectedGuild] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        guildID: '',
        logChannelID: '',
        suggestionsChannelID: '',
        qotdChannelID: '',
        qotdToggle: false,
        ollamaEnabled: false
    });
    const [formMessage, setFormMessage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch guilds
                const guildsResponse = await fetchWithAuth('/api/servers');
                if (!guildsResponse.ok) {
                    throw new Error('Failed to fetch guilds');
                }
                const guildsData = await guildsResponse.json();
                setGuilds(guildsData);

                // Fetch client ID
                const apiUrl = localStorage.getItem('apiUrl') || '';
                const versionResponse = await fetch(`${apiUrl}/api/version`);
                if (!versionResponse.ok) {
                    throw new Error('Failed to fetch version data');
                }
                const versionData = await versionResponse.json();
                setClientId(versionData.client_id);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLeaveServer = async (serverId) => {
        if (window.confirm('Are you sure you want to leave this server?')) {
            try {
                const response = await fetchWithAuth(`/api/leave`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: serverId
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to leave server');
                }

                // Remove server from list
                setGuilds(guilds.filter(guild => guild.id !== serverId));

                // Close modal if the guild was selected
                if (selectedGuild === serverId) {
                    closeModal();
                }
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleGuildSelect = async (guildId) => {
        try {
            setSelectedGuild(guildId);
            const response = await fetchWithAuth(`/api/settings/guilds/${guildId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch guild settings');
            }

            const data = await response.json();
            setFormData({
                guildID: data.settings.guildID || '',
                logChannelID: data.settings.logChannelID || '',
                suggestionsChannelID: data.settings.suggestionsChannelID || '',
                qotdChannelID: data.settings.qotdChannelID || '',
                qotdToggle: data.settings.qotdToggle || false,
                ollamaEnabled: data.settings.ollamaEnabled || false
            });
            setShowModal(true);
        } catch (err) {
            setError(err.message);
            setFormData({
                guildID: guildId,
                logChannelID: '',
                suggestionsChannelID: '',
                qotdChannelID: '',
                qotdToggle: false,
                ollamaEnabled: false
            });
            setShowModal(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormMessage(null);

        try {
            const response = await fetchWithAuth(`/api/settings/guilds/${selectedGuild}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to update guild settings');
            }

            setFormMessage({
                type: 'success',
                text: 'Settings updated successfully'
            });

            // Clear message after 3 seconds
            setTimeout(() => {
                setFormMessage(null);
            }, 3000);
        } catch (err) {
            setFormMessage({
                type: 'error',
                text: err.message
            });
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedGuild(null);
        setFormMessage(null);
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col gap-4 p-12">
                <h1 className="text-3xl">Guilds</h1>

                {loading && <p>Loading guilds...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}

                {!loading && guilds.length === 0 && (
                    <p>No guilds found. Invite AleeBot to your server.</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {guilds.map(guild => (
                        <Card key={guild.id}>
                            <h2 className="text-lg font-medium">{guild.name}</h2>
                            <p>ID: {guild.id} - Members: {guild.members || 'N/A'}</p>
                            <div className="flex justify-between mt-2">                                <button
                                    onClick={() => handleGuildSelect(guild.id)}
                                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                >
                                    Settings
                                </button>
                                <button
                                    onClick={() => handleLeaveServer(guild.id)}
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                    Leave
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="flex gap-4 mt-4">
                    <Link
                        href={clientId ? `https://discord.com/oauth2/authorize?client_id=${clientId}&integration_type=0&scope=bot+applications.commands` : "#"}
                        className={`py-2 px-4 rounded-md text-md ${clientId ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                        Invite
                    </Link>
                </div>
            </div>

            {/* Settings Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">
                                Guild Settings: {guilds.find(g => g.id === selectedGuild)?.name}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <label className="block text-sm text-gray-400 mb-1">Log Channel ID</label>
                                <input
                                    name="logChannelID"
                                    type="text"
                                    placeholder="Enter channel ID"
                                    value={formData.logChannelID}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 rounded p-2"
                                />
                            </div>

                            <div className="mb-2">
                                <label className="block text-sm text-gray-400 mb-1">Suggestions Channel ID</label>
                                <input
                                    name="suggestionsChannelID"
                                    type="text"
                                    placeholder="Enter channel ID"
                                    value={formData.suggestionsChannelID}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 rounded p-2"
                                />
                            </div>

                            <div className="mb-2">
                                <label className="block text-sm text-gray-400 mb-1">QOTD Channel ID</label>
                                <input
                                    name="qotdChannelID"
                                    type="text"
                                    placeholder="Enter channel ID"
                                    value={formData.qotdChannelID}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 rounded p-2"
                                />
                            </div>

                            <div className="flex items-center mb-2">
                                <input
                                    id="qotdToggle"
                                    name="qotdToggle"
                                    type="checkbox"
                                    checked={formData.qotdToggle}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                <label htmlFor="qotdToggle">QOTD Toggle</label>
                            </div>

                            <div className="flex items-center mb-4">
                                <input
                                    id="ollamaEnabled"
                                    name="ollamaEnabled"
                                    type="checkbox"
                                    checked={formData.ollamaEnabled}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                <label htmlFor="ollamaEnabled">Ollama Toggle</label>
                            </div>

                            {formMessage && (
                                <div className={`p-2 mb-4 rounded ${formMessage.type === 'success' ? 'bg-green-800 text-green-200' : 'bg-red-800 text-red-200'}`}>
                                    {formMessage.text}
                                </div>
                            )}

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
