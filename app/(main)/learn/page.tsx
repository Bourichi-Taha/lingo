import FeedWrapper from '@/components/main/feed-wrapper'
import Header from '@/components/main/learn/header'
import Unit from '@/components/main/learn/unit'
import UserProgress from '@/components/main/learn/user-progress'
import Promo from '@/components/main/promo'
import Quests from '@/components/main/quests'
import StickyWrapper from '@/components/main/sticky-wrapper'
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscription } from '@/database/queries'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata: Metadata = {
  title: "Lingo | Learn",
  description: "Learn and have fun.",
};

const LearnPage =async () => {
  const userProgressPromise = getUserProgress();
  const unitsPromise = getUnits();
  const courseProgressPromise = getCourseProgress();
  const percentagePromise = getLessonPercentage();
  const userSubscriptionPromise = getUserSubscription();

  const [userProgress,units,courseProgress,percentage,userSubscription] = await Promise.all([userProgressPromise,unitsPromise,courseProgressPromise,percentagePromise,userSubscriptionPromise]);
  if (!userProgress || !userProgress.activeCourse || !courseProgress) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex gap-[48px] px-6">
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map(unit=>(
          <div className="mb-10">
            <Unit activeLesson={courseProgress.activeLesson}  activeLessonPercentage={percentage} description={unit.description} id={unit.id} lessons={unit.lessons} order={unit.order} title={unit.title} />
          </div>
        ))}
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress activeCourse={userProgress.activeCourse} hasActiveSubscription={isPro} hearts={userProgress.hearts} points={userProgress.points} />
        {!isPro && <Promo />}
        <Quests points={userProgress.points} />

      </StickyWrapper>
    </div>
  )
}

export default LearnPage