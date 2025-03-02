import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json()
        const {username,email,password} =reqBody;

        console.log(reqBody);

        const user = await User.findOne({email});
        if(user) return NextResponse.json({message:'User Already Exist.'},{status:400});

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = await new User({ username,email,password:hashedPassword });

        const savedUser = await newUser.save();
        
        return NextResponse.json({message:'New User Created',success:true,savedUser});

    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}