import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOption } from "../api/auth/[...nextauth]/route";

export default async function PrivateLayout({children}){
  const session = await getServerSession(nextAuthOption)

  
  console.log('session' , session)

  if(!session){
    redirect('/login')
  }


  return <>{children}</>
}