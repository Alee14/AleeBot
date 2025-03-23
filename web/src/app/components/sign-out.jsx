import { signOut } from "@/lib/auth"

export default function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut("discord")
            }}
        >
            <button type="submit">Log out</button>
        </form>
    )
}
