
import prisma from '@/app/utils/connect';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { userId } = await auth();
		const { id } = await params;

		if (!userId) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 },
			);
		}

		const task = await prisma.task.delete({
			where: { id },
		});

		return NextResponse.json(task);
	} catch (error) {
		console.error('Error deleting task', error);
		return NextResponse.json(
			{ error: 'Error deleting task' },
			{ status: 500 },
		);
	}
}
