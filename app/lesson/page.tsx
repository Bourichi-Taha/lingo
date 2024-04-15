import Quize from "@/components/lesson/quize";
import { getLesson, getUserProgress } from "@/database/queries"
import { redirect } from "next/navigation";

const LessonPage =async () => {
    const lessonPromise = getLesson();
    const userProgressPromise = getUserProgress();
    const [lesson,userProgress] = await Promise.all([lessonPromise,userProgressPromise]);

    if (!lesson || !userProgress) {
        redirect('/learn');
    }

    const initialPercentage = (lesson.challenges.filter((challenge)=>challenge.completed).length / lesson.challenges.length) * 100;

  return (
    <Quize initialPercentage={initialPercentage} initialLessonId={lesson.id} initialLessonChallenges={lesson.challenges} initialHearts={userProgress.hearts} userSubscription={undefined} />
  )
}

export default LessonPage