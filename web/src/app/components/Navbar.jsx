import SignOut from "@/app/components/sign-out";

export default function Navbar() {
    return (
        <nav className="bg-gray-900 text-white">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-medium">AleeBot</h1>
                    <ul>
                        <li className="inline-block mx-2">Guilds</li>
                        <li className="inline-block mx-2">Quotes</li>
                        <li className="inline-block mx-2">Settings</li>
                    </ul>
                </div>

                <div className="flex items-center space-x-4">
                    <span>Uptime: 1 day</span>
                    <span>API v(version)</span>
                    <span>4.0.0 Beta</span>
                    <SignOut />
                </div>
            </div>
        </nav>
    )
}
