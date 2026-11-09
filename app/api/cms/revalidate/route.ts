import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json();

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path, now: Date.now() });
    }

    revalidatePath("/", "layout");
    return NextResponse.json({ revalidated: true, all: true, now: Date.now() });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Revalidation failed" },
      { status: 500 }
    );
  }
}
