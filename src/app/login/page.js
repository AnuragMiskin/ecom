"use client";
import { useState } from "react";
import Link from "next/link";

export default function login(){
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const res=await fetch('/api/login',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({email,password})
        })
        const data=await res.json();
        if(res.ok){
            console.log('login successfull')
        }
        else{
            console.error('failed to log in',data.message)
        }
    }

    return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <button type="submit">login</button>
        </form>
        <p>DONT HAVE AN ACCOUNT?
            <Link href='/register'>SIGN UP </Link>
        </p>
    </div>
    )
}