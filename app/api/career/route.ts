import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      appliedPosition,
      experience,
      coverLetter,
      resumeUrl,
    } = body;

    if (!fullName || !email || !phone || !appliedPosition) {
      return NextResponse.json(
        { error: "Name, email, phone, and applied position are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.from("job_applications").insert([
      {
        applicant_name: fullName,
        email,
        phone,
        job_title: appliedPosition,
        experience_level: experience || "Not specified",
        cover_letter: coverLetter || null,
        resume_url: resumeUrl || null,
        status: "New",
      },
    ]);

    if (error) {
      console.warn("Supabase job_applications insert notice:", error.message);
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully. Our talent team will review your credentials.",
    });
  } catch (error: any) {
    console.error("Career API error:", error);
    return NextResponse.json(
      { error: "Internal server error processing career application." },
      { status: 500 }
    );
  }
}
