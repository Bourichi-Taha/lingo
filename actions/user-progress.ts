"use server";

import db from "@/database/drizzle";
import { getCourseById, getUserProgress } from "@/database/queries";
import { challengeProgress, challenges, userProgress } from "@/database/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserProgress = async (courseId: number) => {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error("Unauthorized!");
    }

    const course = await getCourseById(courseId);

    if (!course) {
        throw new Error("Course not found!");
    }

    const existingUserProgress = await getUserProgress();

    if (existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            username: user.firstName || "User",
            userImageSrc: user.imageUrl || "/mascot.svg",
        });
        revalidatePath("/learn");
        revalidatePath("/courses");
        redirect("/learn");
    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        username: user.firstName || "User",
        userImageSrc: user.imageUrl || "/mascot.svg",
    });

    revalidatePath("/learn");
    revalidatePath("/courses");
    redirect("/learn");
}


export const wrongAnswer = async (challengeId: number) => {
    const {userId} = await auth();

    if (!userId) {
        throw new Error("Unauthorized!");
    }

    const currentUserProgress = await getUserProgress();

    if (!currentUserProgress) {
        throw new Error("user progress not found!")
    }

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id,challengeId),
    });

    if (!challenge) {
        throw new Error("Challenge not found!");
    }

    const lessonId = challenge.lessonId;

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId,userId),
            eq(challengeProgress.challengeId,challengeId)
        ),
    });

    const isPractice = !!existingChallengeProgress;
    if (isPractice) {
        return { error: "practice"};
    }

    if (currentUserProgress.hearts === 0) {
        return {error: "hearts"};
    }

    await db.update(userProgress).set({
        hearts: Math.max(0,currentUserProgress.hearts-1),
    }).where(
        eq(userProgress.userId,userId)
    );
    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/leaderboard");
    revalidatePath("/quests");
    revalidatePath("/shop");
    revalidatePath(`/lesson/${lessonId}`);
}