import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, password, rol } = await req.json();

  try {
    const newUser = await db.query(
      "INSERT INTO users (username, password, rol) VALUES ($1, $2, $3) RETURNING *",
      [name, password, rol]
    );
    return new Response(JSON.stringify(newUser.rows[0]), {
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
    const query = "SELECT * FROM users";
    const users = await db.query(query);
    return NextResponse.json(users.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
