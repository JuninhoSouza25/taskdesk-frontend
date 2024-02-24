import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOption } from "../api/auth/[...nextauth]/route";

export default async function PrivateLayout({children}){
  const session = await getServerSession(nextAuthOption)

  if(!session){
    redirect('/login')
  }


  return <>{children}</>
}