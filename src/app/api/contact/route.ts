import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        // In a real application, you might send an email here using a service like Resend or SendGrid.
        // For now, we'll just log the message and return success.
        console.log("Contact Form Submission:", { name, email, message });

        return NextResponse.json({ message: "Message sent successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
