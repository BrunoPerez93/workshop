import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const query = "SELECT * FROM clients";
    const clients = await db.query(query);
    return NextResponse.json(clients.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req) {
  const { name, lastname, ci, cellphone } = await req.json();

  if (!name || !cellphone) {
    return new Response(
      JSON.stringify({ error: "Name and cellphone are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const ciCheck = await db.query("SELECT 1 FROM clients WHERE ci = $1", [ci]);
    if (ciCheck.rowCount > 0) {
      return new Response(JSON.stringify({ error: "CI already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newClient = await db.query(
      "INSERT INTO clients (name, lastname, ci, cellphone) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, lastname, ci, cellphone]
    );
    return new Response(JSON.stringify(newClient.rows[0]), {
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
    const updatedClient = await db.query(
      "UPDATE clients SET name = $1, lastname = $2, ci = $3, cellphone = $4 WHERE id = $5 RETURNING *",
      [name, lastname, ci, cellphone, id]
    );
    if (updatedClient.rowCount === 0) {
      return new Response(JSON.stringify({ error: "Client not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(updatedClient.rows[0]), {
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
