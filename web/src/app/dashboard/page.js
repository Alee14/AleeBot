import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOut from "@/app/components/sign-out";

export default async function Home() {
    const session = await auth();
    if (!session) redirect("/");

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {session.user?.name}</p>
            <SignOut />
        </div>
    )
}
