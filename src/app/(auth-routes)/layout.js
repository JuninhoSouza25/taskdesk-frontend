import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }) {
  const session = await getServerSession();

  if (session) {
    redirect('/home');
    return null; 
  }

  return <>{children}</>;
}
