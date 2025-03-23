import { signIn } from "@/lib/auth"

export default function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("discord")
            }}
        >
            <button type="submit">Login with Discord</button>
        </form>
    )
}
