import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new product
export async function POST(req) {
    const { name, description, price, imageUrl } = await req.json();

    const product = await prisma.product.create({
        data: { name, description, price, imageUrl },
    });

    return new Response(JSON.stringify(product), { status: 201 });
}

// Read all products
export async function GET() {
    const products = await prisma.product.findMany();
    return new Response(JSON.stringify(products), { status: 200 });
}

// Update a product
export async function PUT(req) {
    const { id, name, description, price, imageUrl } = await req.json();

    const product = await prisma.product.update({
        where: { id },
        data: { name, description, price, imageUrl },
    });

    return new Response(JSON.stringify(product), { status: 200 });
}

// Delete a product
export async function DELETE(req) {
    const { id } = await req.json();

    await prisma.product.delete({ where: { id } });

    return new Response(JSON.stringify({ message: 'Product deleted' }), { status: 200 });
}
