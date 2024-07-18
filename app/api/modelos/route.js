import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const query = "SELECT * FROM models";
    const models = await db.query(query);
    return NextResponse.json(models.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req) {
    const { name, brand_id } = await req.json();
  
    try {
      const newModel = await db.query(
        "INSERT INTO models (name, brand_id) VALUES ($1, $2) RETURNING *",
        [name, brand_id]
      );
      return new Response(JSON.stringify(newModel.rows[0]), {
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
    const { id, name, brand_id } = await req.json();
  
    try {
      const updatedModel = await db.query(
        "UPDATE models SET name = $1, brand_id = $2 WHERE id = $3 RETURNING *",
        [name, brand_id, id]
      );
      if (updatedModel.rowCount === 0) {
        return new Response(JSON.stringify({ error: "Model not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify(updatedModel.rows[0]), {
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