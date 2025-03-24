import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOut from "@/app/components/sign-out";
import Guilds from "@/app/components/Guilds";

export default async function Home() {
    const session = await auth();
    if (!session) redirect("/");

    return (
        <>
            <nav className="bg-gray-900 text-white">
                <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                    <div className="flex items-center">
                        <h1 className="text-xl font-medium">AleeBot</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <p className="text-sm md:text-base">Welcome {session.user?.username}!</p>
                        <SignOut />
                    </div>
                </div>
            </nav>
            <div className="flex">
                <div>
                    <div>Settings</div>
                    <Guilds session={session} />
                </div>
                <div>
                    <h1 className="text-2xl">Logging</h1>
                    <h2>Channel 1</h2>
                    <h2>Channel 2</h2>
                    <h1 className="text-2xl">Quote of the Day</h1>
                    <h1 className="text-2xl">LLM Chatbot</h1>
                </div>
            </div>
        </>
    )
}
