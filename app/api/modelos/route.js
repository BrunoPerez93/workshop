import { db } from "@/utils/db";
import Model from "@/models/Model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await db();
    const url = new URL(req.url);
    const brandId = url.searchParams.get('brand_id');
    
    const filter = brandId ? { brand_id: brandId } : {};
    const models = await Model.find(filter).populate("brand_id");
    return NextResponse.json(models);
  } catch (error) {
    console.error("Error retrieving models:", error);
    return NextResponse.json({ error: "Error retrieving models" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, brand_id } = await req.json();

    if (!name || !brand_id) {
      return NextResponse.json({ error: "Name and Brand are required" }, { status: 400 });
    }

    await db();

    const existingModel = await Model.findOne({ name, brand_id });
    if (existingModel) {
      return NextResponse.json({ error: "Model already exists for this brand" }, { status: 400 });
    }

    const newModel = new Model({ name, brand_id });
    const savedModel = await newModel.save();
    return NextResponse.json(savedModel);
  } catch (error) {
    console.error("Error creating model:", error);
    return NextResponse.json({ error: "Error creating model" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, name, brand_id } = await req.json();

    await db();

    const updatedModel = await Model.findByIdAndUpdate(
      id,
      { name, brand_id },
      { new: true } 
    ).populate('brand_id'); 

    if (!updatedModel) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 });
    }

    return NextResponse.json(updatedModel);
  } catch (error) {
    console.error("Error updating model:", error);
    return NextResponse.json({ error: "Error updating model" }, { status: 500 });
  }
}