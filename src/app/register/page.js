"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message,setMessage]=useState('');
    const router=useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        const data=await res.json()
        if (res.ok) {
            setMessage('registration successfull! redirecting to login');
            setTimeout(()=>{
                router.push('/login');
            },2000);
        } else {
            setMessage('registration failed:'+data.message);
        }
    };

    return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
    </div>
    );
}
