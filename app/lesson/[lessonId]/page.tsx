import Quize from "@/components/lesson/quize";
import { getLesson, getUserProgress, getUserSubscription } from "@/database/queries"
import { redirect } from "next/navigation";

interface LessonIdPageProps {
    params: {
        lessonId: number;
    }
}

const LessonIdPage =async (props:LessonIdPageProps) => {
    const {params} = props;
    const lessonPromise = getLesson(params.lessonId);
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

export default LessonIdPage