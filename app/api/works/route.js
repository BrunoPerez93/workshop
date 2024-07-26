import mongoose from "mongoose";
import { db } from "@/utils/db";
import Work from "@/models/Work";
import Brand from '@/models/Brand'; 
import Model from '@/models/Model'; 
import Mechanic from '@/models/Mechanic'; 
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

    return NextResponse.json(savedWork, { status: 201 });
  } catch (error) {
    console.error("Error saving work:", error);
    return NextResponse.json(
      { error: "Failed to create work" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await db();

    const { searchParams } = new URL(req.url);
    const matricula = searchParams.get('matricula');
    const clientName = searchParams.get('clientName');

    let query = {};
    if (matricula) {
      query.matricula = new RegExp(matricula, 'i');
    }

    let works;
    if (clientName) {
      console.log("Searching by client name:", clientName);
      const clients = await Client.find({
        $or: [
          { name: new RegExp(clientName, 'i') },
          { lastname: new RegExp(clientName, 'i') }
        ]
      });

      const clientIds = clients.map(client => client._id);

      works = await Work.find({ 
        client: { $in: clientIds }
      })
        .populate('brand', 'name')
        .populate('model', 'name')
        .populate('tecnico', 'username')
        .populate('client', 'name lastname cellphone');

    } else {
      works = await Work.find(query)
        .populate('brand', 'name')
        .populate('model', 'name')
        .populate('tecnico', 'username')
        .populate('client', 'name lastname cellphone');
    }

    return NextResponse.json(works);
  } catch (error) {
    console.error("Error retrieving works:", error);
    return NextResponse.json({ error: "Error retrieving works" }, { status: 500 });
  }
}