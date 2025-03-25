'use client';
import { useAuth } from '@/context/middleware';

export default function SignOut() {
    const { logout } = useAuth();

    return (
        <button
            type="button"
            onClick={logout}
            className="py-2 px-4 rounded-md text-md bg-red-700 hover:bg-red-500"
        >
            Sign out
        </button>
    );
}
