'use client';
import { useState, useEffect } from "react";
import Card from "@/app/components/Card";
import Navbar from "@/app/components/Navbar";
import { fetchWithAuth } from "@/utils/api";

export default function Quotes() {
    const [pendingQuotes, setPendingQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        author: '',
        authorImage: '',
        quote: '',
        year: '',
        submitterID: ''
    });

    useEffect(() => {
        fetchPendingQuotes();
    }, []);

    const fetchPendingQuotes = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth('/api/quotes/pending');

            if (!response.ok) {
                throw new Error('Failed to fetch pending quotes');
            }

            const data = await response.json();
            setPendingQuotes(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            const response = await fetchWithAuth('/api/quotes/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit quote');
            }

            setMessage({
                type: 'success',
                text: 'Quote submitted successfully'
            });

            // Reset form
            setFormData({
                author: '',
                authorImage: '',
                quote: '',
                year: '',
                submitterID: ''
            });
        } catch (err) {
            setMessage({
                type: 'error',
                text: err.message
            });
        }
    };

    const handleApproveQuote = async (id) => {
        if (window.confirm('Are you sure you want to approve this quote?')) {
            try {
                const response = await fetchWithAuth('/api/quotes/approve', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id })
                });

                if (!response.ok) {
                    throw new Error('Failed to approve quote');
                }

                setMessage({
                    type: 'success',
                    text: 'Quote approved successfully'
                });

                // Refresh quotes
                fetchPendingQuotes();
            } catch (err) {
                setMessage({
                    type: 'error',
                    text: err.message
                });
            }
        }
    };

    const handleRejectQuote = async (id) => {
        if (window.confirm('Are you sure you want to reject this quote?')) {
            try {
                const response = await fetchWithAuth('/api/quotes/reject', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id })
                });

                if (!response.ok) {
                    throw new Error('Failed to reject quote');
                }

                setMessage({
                    type: 'success',
                    text: 'Quote rejected successfully'
                });

                // Refresh quotes
                fetchPendingQuotes();
            } catch (err) {
                setMessage({
                    type: 'error',
                    text: err.message
                });
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col gap-4 p-12">
                <h1 className="text-3xl">Submit New Quote</h1>
                <form className="flex flex-col gap-4 px-20" onSubmit={handleSubmit}>
                    <input
                        name="author"
                        type="text"
                        placeholder="Author"
                        value={formData.author}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        name="authorImage"
                        type="url"
                        placeholder="Author URL"
                        value={formData.authorImage}
                        onChange={handleInputChange}
                        required
                    />
                    <textarea
                        name="quote"
                        placeholder="Quote"
                        value={formData.quote}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        name="year"
                        type="number"
                        placeholder="Year"
                        value={formData.year}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        name="submitterID"
                        type="text"
                        placeholder="Submitter ID"
                        value={formData.submitterID}
                        onChange={handleInputChange}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </form>

                {message && (
                    <div className={`p-4 rounded ${message.type === 'success' ? 'bg-green-800 text-green-200' : 'bg-red-800 text-red-200'}`}>
                        {message.text}
                    </div>
                )}


                <h1 className="text-3xl">Pending Quotes</h1>

                {loading && <p>Loading quotes...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}

                {!loading && pendingQuotes.length === 0 && (
                    <p>No pending quotes found.</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {pendingQuotes.map(quote => (
                        <Card key={quote.id}>
                            <h2 className="text-xl font-medium">{quote.author}</h2>
                            <p>Author URL: {quote.authorImage}</p>
                            <p>{quote.quote}</p>
                            <small className="block mb-3">- {quote.year}</small>
                            <p className="text-sm text-gray-400 mb-2">Submitted by: {quote.submitterAuthor || quote.submitterID}</p>
                            <div className="flex gap-3 mt-2">
                                <button
                                    onClick={() => handleApproveQuote(quote.id)}
                                    className="bg-green-600 hover:bg-green-500 text-white py-1 px-3 rounded"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleRejectQuote(quote.id)}
                                    className="bg-red-600 hover:bg-red-500 text-white py-1 px-3 rounded"
                                >
                                    Reject
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
