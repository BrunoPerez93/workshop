import Client from "@/models/Client";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

export async function GET() {
  try {
    await connectToDatabase();
    const clients = await Client.find({});
    return NextResponse.json(clients);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req) {
  const { name, lastname, ci, cellphone } = await req.json();

  if (!name || !cellphone || !ci) {
    return new Response(
      JSON.stringify({ error: "Name, CI, and cellphone are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    await connectToDatabase();

    const existingClient = await Client.findOne({ ci });
    if (existingClient) {
      return new Response(JSON.stringify({ error: "CI already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newClient = new Client({ name, lastname, ci, cellphone });
    await newClient.save();

    return new Response(JSON.stringify(newClient), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req) {
  const { id, name, lastname, ci, cellphone } = await req.json();

  try {
    await connectToDatabase();

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { name, lastname, ci, cellphone },
      { new: true }
    );

    if (!updatedClient) {
      return new Response(JSON.stringify({ error: "Client not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(updatedClient), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
