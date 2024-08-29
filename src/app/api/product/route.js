import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();

export async function GET(){
    try{
        const products=await prisma.products.findMany();
        return new Response(JSON.stringify(products),{status:200});
    }
    catch(error){
        return new Response(JSON.stringify({error:'error fetching products'}),{status:500})
    }
}