import mongoose from "mongoose";
import { db } from "@/utils/db";
import Work from "@/models/Work";
import Brand from '@/models/Brand'; // Adjust path as needed
import Model from '@/models/Model'; // Adjust path as needed
import Mechanic from '@/models/Mechanic'; // Adjust path as needed
import Client from '@/models/Client'; 
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await db();

    const {
      brand,
      model,
      matricula,
      km,
      year,
      fallo,
      repuestos,
      observaciones,
      tecnico,
      manoDeObra,
      repuesto,
      total,
      client,
    } = await req.json();

    console.log("Received data:", {
      brand,
      model,
      matricula,
      km,
      year,
      fallo,
      repuestos,
      observaciones,
      tecnico,
      manoDeObra,
      repuesto,
      total,
      client,
    });

    if (!brand || !model || !matricula || !manoDeObra || !repuesto || !total || !client) {
      console.error("Required fields are missing");
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(client)) {
      console.error("Invalid client ID");
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
      anio: year,
      fallo,
      repuestosInfo: repuestos,
      observaciones,
      tecnico,
      manoDeObra,
      repuesto,
      total,
      client,
    });

    const savedWork = await newWork.save();

    console.log("Work saved successfully:", savedWork);

    return NextResponse.json(savedWork, { status: 201 });
  } catch (error) {
    console.error("Error saving work:", error);
    return NextResponse.json(
      { error: "Failed to create work" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await db(); // Ensure database connection

    const works = await Work.find({})
      .populate('brand', 'name')   // Populate 'brand' field with 'name'
      .populate('model', 'name')   // Populate 'model' field with 'name'
      .populate('tecnico', 'username') // Populate 'tecnico' field with 'username'
      .populate('client', 'name'); // Populate 'client' field with 'name'

    return NextResponse.json(works);
  } catch (error) {
    console.error("Error retrieving works:", error);
    return NextResponse.json({ error: "Error retrieving works" }, { status: 500 });
  }
}

