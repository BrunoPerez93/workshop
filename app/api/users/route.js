import { db } from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

await db();

export async function POST(req) {
  try {
    const { username, password, rol } = await req.json();
    const newUser = new User({
      username,
      password,
      rol,
    });
    
    const savedUser = await newUser.save();
    return NextResponse.json(savedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error retrieving users" }, { status: 500 });
  }
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "OPTIONS, POST, GET",
      "Content-Type": "application/json",
    },
  });
}
