import { signIn } from "@/lib/auth"

export default function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("discord")
            }}
        >
            <button type="submit" className="bg-discord-blurple p-3 rounded-md hover:bg-discord-blurple">Login with Discord</button>
        </form>
    )
}
