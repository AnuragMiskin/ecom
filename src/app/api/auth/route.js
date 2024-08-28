import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import NextAuth from "next-auth/next";

const prisma=new PrismaClient();

const handler=NextAuth({
    providers:[
        CredentialsProvider({
            async authorize(credentials){
                const user=await prisma.user.findUnique({
                    where:{email:credentials.email}
                })
                if(user && (await bcrypt.compare(credentials.password,user.password))){
                    return user;
                }
                return null;
            }
        })
    ],
    pages:{
        signIn:'/login'
    },
    session:{
        jwt:true
    }
})

export{handler as GET,handler as POST};