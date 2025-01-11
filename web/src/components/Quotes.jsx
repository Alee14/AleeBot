import { useState, useEffect } from 'react';
import '../styles/Quote.css'

export function PendingQuotes() {
    const [quotes, setQuotes] = useState([]);

    const fetchQuotes = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/pending-quotes');
            const data = await response.json();
            setQuotes(data);
        } catch (error) {
            console.error('Failed to fetch quotes:', error);
        }
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    const approveQuote = async (id) => {
        try {
            const response = await fetch('http://localhost:3000/api/approve-quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                fetchQuotes(); // Refresh the listing after approving the quote
            } else {
                console.error('Failed to approve quote');
            }
        } catch (error) {
            console.error('Error approving quote:', error);
        }
    };

    const rejectQuote = async (id) => {
        try {
            const response = await fetch('http://localhost:3000/api/reject-quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                fetchQuotes(); // Refresh the listing after approving the quote
            } else {
                console.error('Failed to reject quote');
            }
        } catch (error) {
            console.error('Error rejecting quote:', error);
        }
    };

    return (
        <div>
            <h1>Pending Quotes</h1>
            {quotes.length > 0 ? (
                <ul className="quoteList">
                    {quotes.map((quote) => (
                        <li key={quote.id} className="quoteList">
                            <div className="quote">
                                <div className="author">
                                    <img src={quote.authorImage} alt="No Profile" width="50" height="50"/>
                                    <h1 className="quoteAuthor">{quote.author}</h1>
                                </div>
                                <p className="quoteText">{quote.quote}</p>
                                <small>- {quote.year}</small>
                            </div>
                            <button onClick={() => approveQuote(quote.id)}>Approve</button>
                            <button onClick={() => rejectQuote(quote.id)}>Reject</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No pending quotes available.</p>
            )}
        </div>
    );
}
