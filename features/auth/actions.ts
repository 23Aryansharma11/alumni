"use server";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function isUserProfileComplete(): Promise<boolean> {
  // check if user has all the required info
  // 1. get logged in user
  const userInfo = await auth.api.getSession({
    headers: await headers(),
  });
  if (!userInfo) {
    redirect("/auth");
  }
  // 2. search db for user info like passout year
  const user = await db.query.user.findFirst({
    where: (userTable, { eq }) => eq(userTable.id, userInfo.user.id),
  });

  if (!user) {
    redirect("/auth");
  }
  // 3. Check logged in user data
  if (!user.passoutYear || user.passoutYear <= 0) return false;

  return true;
}
