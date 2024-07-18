import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const query = "SELECT * FROM brands";
    const brands = await db.query(query);
    return NextResponse.json(brands.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req) {
  const { name } = await req.json();

  try {
    const newBrand = await db.query(
      "INSERT INTO brands (name) VALUES ($1) RETURNING *",
      [name]
    );
    return new Response(JSON.stringify(newBrand.rows[0]), {
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
  const { id, name } = await req.json();

  try {
    const updatedBrand = await db.query(
      "UPDATE brands SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    if (updatedBrand.rowCount === 0) {
      return new Response(JSON.stringify({ error: "Brand not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(updatedBrand.rows[0]), {
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
