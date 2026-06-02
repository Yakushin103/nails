import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      // Убираем include временно
    });

    return NextResponse.json({ success: true, courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { success: false, error: "Ошибка при получении курсов" },
      { status: 500 }
    );
  }
}
