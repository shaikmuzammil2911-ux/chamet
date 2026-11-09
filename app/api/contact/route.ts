import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, subject, message } = body;

    if (!fullName || !phone || !message) {
      return NextResponse.json(
        { error: "Full name, phone number, and message are required." },
        { status: 400 }
      );
    }

    // Insert into Supabase contact_messages table
    const { data, error } = await supabase.from("contact_messages").insert([
      {
        full_name: fullName,
        phone,
        email: email || null,
        subject: subject || "Website General Inquiry",
        message,
        status: "New",
      },
    ]);

    if (error) {
      console.warn("Supabase contact_messages insert notice:", error.message);
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry received successfully. Our team will contact you shortly.",
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error processing contact submission." },
      { status: 500 }
    );
  }
}

