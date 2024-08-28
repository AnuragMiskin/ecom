import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        // Ensure that you use req.json() as a function
        const { email, password } = await req.json();
        
        // Fetch user from the database
        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Check if the user exists
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        
        // Check if the password matches
        if (!isMatch) {
            return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
        }

        // Return success response
        return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 });
    } catch (error) {
        // Handle errors
        return new Response(JSON.stringify({ message: 'Error logging in' }), { status: 500 });
    }
}
