import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: 'Ov23liervoWYztxecDD5',
            clientSecret: 'f8ce8ccad30f7807c94178892af1143978cb9291',
        })
    ]
};

export default NextAuth(authOptions);