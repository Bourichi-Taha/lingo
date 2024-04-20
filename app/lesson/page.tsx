import Quize from "@/components/lesson/quize";
import { getLesson, getUserProgress, getUserSubscription } from "@/database/queries"
import { Metadata } from "next";
import { redirect } from "next/navigation";

const LessonPage =async () => {
    const lessonPromise = getLesson();
    const userProgressPromise = getUserProgress();
    const userSubscriptionPromise = getUserSubscription();
    const [lesson,userProgress,userSubscription] = await Promise.all([lessonPromise,userProgressPromise,userSubscriptionPromise]);

    if (!lesson || !userProgress) {
        redirect('/learn');
    }

    const initialPercentage = (lesson.challenges.filter((challenge)=>challenge.completed).length / lesson.challenges.length) * 100;

  return (
    <Quize initialPercentage={initialPercentage} initialLessonId={lesson.id} initialLessonChallenges={lesson.challenges} initialHearts={userProgress.hearts} userSubscription={userSubscription} />
  )
}

export default LessonPage