import { db } from "@/utils/db";
import Work from "@/models/Work";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await db();

    const {
      brand,
      model,
      matricula,
      km,
      anio,
      fallo,
      repuestosInfo,
      observaciones,
      tecnico,
      manoDeObra,
      repuesto,
      total,
      client,
    } = await req.json();

    if (!brand || !model || !matricula || !manoDeObra || !repuesto || !total || !client) {
        return NextResponse.json(
          { error: "Required fields are missing" },
          { status: 400 }
        );
      }

    if (!mongoose.Types.ObjectId.isValid(client)) {
      return NextResponse.json(
        { error: "Invalid client ID" },
        { status: 400 }
      );
    }

    const newWork = new Work({
      brand,
      model,
      matricula,
      km,
      anio,
      fallo,
      repuestosInfo,
      observaciones,
      tecnico,
      manoDeObra,
      repuesto,
      total,
      client,
    });

    const savedWork = await newWork.save();

    return NextResponse.json(savedWork, { status: 201 });
  } catch (error) {
    console.error("Error creating work entry:", error);
    return NextResponse.json(
      { error: "Error creating work entry" },
      { status: 500 }
    );
  }
}