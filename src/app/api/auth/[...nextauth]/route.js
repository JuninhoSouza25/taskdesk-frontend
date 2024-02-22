import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption = {
  providers:[
      CredentialsProvider({
      name:"credentials",
      credentials: {
        email:{label: "Email", type:"text"},
        password:{label:"Password", type:"password"}
      },
      async authorize(credentials, req) {
        
        const response = await fetch(process.env.LOGIN_URL, {
          method:'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        })

        const user = await response.json()
  
        if (user && response.ok) {
          console.log(user)
          return user
        } else {

          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({token, user}){
      user && (token.user = user)
      return token
    },
    async session({ session, token}){
      session = token.user
      return session
    }
  }

}

const handler = NextAuth(authOption)
const nextAuthOption = NextAuth(authOption)


export { handler as GET, handler as POST, nextAuthOption};