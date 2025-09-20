"use server";

import { db } from "@/db";
import { auth } from "@/lib/auth";
import { user as userSchema } from "@/db/schema/auth-schema";

// Next apis
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// types
import { type CompleteProfileFormValues } from "./components/complete-profile-form";
import { eq } from "drizzle-orm";

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

export async function completeUserProfile(data: CompleteProfileFormValues) {
  const userInfo = await auth.api.getSession({
    headers: await headers(),
  });
  if (!userInfo) {
    redirect("/auth");
  }

  const userId = userInfo.user.id;

  const updatedUser = await db
    .update(userSchema)
    .set({
      passoutYear: data.passoutYear,
      course: data.course,
      branch: data.branch,
      updatedAt: new Date(),
    })
    .where(eq(userSchema.id, userId))
    .returning();

  if (!updatedUser.length) {
    redirect("/auth");
  }

  // return only plain data you want to share
  return {
    passoutYear: updatedUser[0].passoutYear,
    course: updatedUser[0].course,
    branch: updatedUser[0].branch,
  };
}
