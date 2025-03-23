import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOut from "@/app/components/sign-out";
import Guilds from "@/app/components/Guilds";

export default async function Home() {
    const session = await auth();
    if (!session) redirect("/");

    return (
        <div>
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
            <Guilds session={session} />
        </div>
    )
}
