import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  if (session) redirect("/dashboard");
    return (
    <>
      <main className="flex justify-center items-center h-screen">
        <form className="flex flex-col gap-4 w-80">
          <input for='username' type='text' placeholder='Username' />
          <input for='password' type='password' placeholder='Password' />
          <input for='api' type='url' placeholder='API URL' />
          <input type="submit" value="Login" />
        </form>
      </main>
    </>
  );
}
