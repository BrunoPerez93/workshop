import { db } from "@/utils/db";
import Mechanic from "@/models/Mechanic";
import { NextResponse } from "next/server";

await db();

export async function POST(req) {
  try {
    const { username } = await req.json();
    const newMechanic = new Mechanic({
      username,
    });
    
    const savedMechanic = await newMechanic.save();
    return NextResponse.json(savedMechanic);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating mechanic" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const mechanics = await Mechanic.find({});
    return NextResponse.json(mechanics);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error retrieving mechanics" }, { status: 500 });
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
