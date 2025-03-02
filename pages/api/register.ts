// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  console.log("Request Body:", req.body);

  const { username, email, password } = req.body;

  // Validate inputs
  if (!username || typeof username !== "string" || username.trim().length < 3) {
    return res.status(400).json({ message: "Invalid or missing username." });
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid or missing email." });
  }
  if (!password || typeof password !== "string" || password.trim().length < 6) {
    return res.status(400).json({ message: "Invalid or missing password." });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken." });
    }

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save the new user to the database
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Set up Nodemailer transporter (ensure you have valid SMTP settings)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.example.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || "your_smtp_username",
        pass: process.env.SMTP_PASS || "your_smtp_password",
      },
    });

    // Send a confirmation email
    const mailOptions = {
      from: '"Your App Name" <no-reply@example.com>',
      to: email,
      subject: "Registration Confirmation",
      text: `Hello ${username},\n\nThank you for registering!`,
      html: `<p>Hello ${username},</p><p>Thank you for registering!</p>`,
    };

    console.log("Mail Options:", mailOptions); // check if the mail options are correct
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "User registered successfully. Confirmation email sent.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error." });
  } finally {
    await prisma.$disconnect();
  }
}
