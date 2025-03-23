import { redirect } from "next/navigation";
import SignIn from "@/app/components/sign-in";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  if (session) redirect("/dashboard");
    return (
    <>
      <main>
      <SignIn />
      </main>
    </>
  );
}
