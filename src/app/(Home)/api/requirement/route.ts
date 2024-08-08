import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Requirement from "@/models/requirements";
import { isAuthenticated } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const {
      transactionType,
      propertyType,
      area,
      location,
      budget,
      duration,
      name,
      email,
      phone,
    } = body;

    if (
      !transactionType ||
      !propertyType ||
      !area ||
      !location ||
      !budget ||
      !duration ||
      !name ||
      !email ||
      !phone
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newRequirement = new Requirement({
      transactionType,
      propertyType,
      area,
      location,
      budget,
      duration,
      name,
      email,
      phone,
    });

    await newRequirement.save();

    // // Send email notification
    // try {
    //   await sendRequirementNotification(newRequirement);
    // } catch (emailError) {
    //   console.error("Detailed error sending email notification:", emailError);
    //   return NextResponse.json(
    //     { error: "Error sending email notification" },
    //     { status: 500 }
    //   );
    // }

    return NextResponse.json(
      { message: "Requirement submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in requirement route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    const requirements = await Requirement.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ requirements }, { status: 200 });
  } catch (error) {
    console.error("Error fetching requirements:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
