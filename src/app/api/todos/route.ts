import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
	const todos = await prisma.todo.findMany();

	return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
	const body = await req.json();

	const todo = await prisma.todo.create({
		data: {
			title: body.title,
		},
	});

	return NextResponse.json(todo);
}
