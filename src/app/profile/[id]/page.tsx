"use client";

import { useParams } from "next/navigation";

export default function ProfilePageWithId(){
    const { id } = useParams(); 
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-3">
        <h1 className="text-3xl text-center">Profile Page, ID : <span className="p-2 text-2xl rounded-md bg-orange-500 text-black" >{id}</span></h1>
        <h4>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione voluptates, veniam accusantium adipisci dolores blanditiis.</h4>
        </div>
    )
}