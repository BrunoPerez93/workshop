import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { username } = await req.json();

  try {
    const newMechanic = await db.query(
      "INSERT INTO mechanics (username) VALUES ($1) RETURNING *",
      [username]
    );
    return new Response(JSON.stringify(newMechanic.rows[0]), {
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

export function OPTIONS(req, res) {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "OPTIONS, POST",
      "Content-Type": "application/json",
    },
  });
}

export async function GET(request) {
  try {
    const query = "SELECT * FROM mechanics";
    const users = await db.query(query);
    return NextResponse.json(users.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
