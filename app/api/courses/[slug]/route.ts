import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const course = await prisma.course.findUnique({
      where: { slug: params.slug },
    });

    if (!course) {
      return NextResponse.json(
        { success: false, error: "Курс не найден" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, course });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { success: false, error: "Ошибка при получении курса" },
      { status: 500 }
    );
  }
}
