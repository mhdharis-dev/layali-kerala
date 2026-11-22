import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "layali-kerala-secret-jwt-key-2024"
);

export interface AdminPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function signAdminToken(payload: AdminPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

export async function verifyAdminToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as unknown as AdminPayload;
  } catch (error) {
    return null;
  }
}

export async function getSessionAdmin(): Promise<AdminPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  return await verifyAdminToken(token);
}
