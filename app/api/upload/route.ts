import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { supabase } from "@/lib/supabase/client";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "manaverse";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(file, folder);

    if (result.secure_url) {
      // Register in Supabase media_assets table
      await supabase.from("media_assets").insert([
        {
          name: file.name,
          public_id: result.public_id,
          secure_url: result.secure_url,
          media_type: file.type.startsWith("video") ? "video" : "image",
          bytes: file.size,
          folder,
        },
      ]);

      return NextResponse.json({
        success: true,
        secure_url: result.secure_url,
        public_id: result.public_id,
      });
    }

    return NextResponse.json(
      {
        error:
          result.error ||
          "Upload failed. Verify Cloudinary credentials and ensure preset is set to Unsigned in Cloudinary settings.",
      },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Upload API route exception:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload media file" },
      { status: 500 }
    );
  }
}

