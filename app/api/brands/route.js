import { db } from "@/utils/db";
import Brand from "@/models/Brand"; // Ensure this path is correct
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await db();
    const brands = await Brand.find({});
    return NextResponse.json(brands);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error retrieving brands" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    await db();

    const lowerCaseName = name.toLowerCase();
    const existingBrand = await Brand.findOne({ name: lowerCaseName });
    if (existingBrand) {
      return NextResponse.json({ error: "Brand already exists" }, { status: 400 });
    }

    const newBrand = new Brand({ name });
    const savedBrand = await newBrand.save();
    return NextResponse.json(savedBrand);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating brand" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, name } = await req.json();

    await db();

    const updatedBrand = await Brand.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedBrand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBrand);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error updating brand" }, { status: 500 });
  }
}
