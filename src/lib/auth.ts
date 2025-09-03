import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function getSessionUser() {
  const session = await getServerSession(authOptions);
  const u = (session as unknown as { user?: { id?: string; email?: string | null } }).user;
  return u?.id ? { id: String(u.id), email: u.email ?? null } : null;
}

