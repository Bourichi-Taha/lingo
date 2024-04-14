import FeedWrapper from '@/components/main/feed-wrapper'
import Header from '@/components/main/learn/header'
import Unit from '@/components/main/learn/unit'
import UserProgress from '@/components/main/learn/user-progress'
import StickyWrapper from '@/components/main/sticky-wrapper'
import { getUnits, getUserProgress } from '@/database/queries'
import { redirect } from 'next/navigation'
import React from 'react'

const LearnPage =async () => {
  const userProgressPromise = getUserProgress();
  const unitsPromise = getUnits();
  const [userProgress,units] = await Promise.all([userProgressPromise,unitsPromise]);
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  return (
    <div className="flex gap-[48px] px-6">
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map(unit=>(
          <div className="mb-10">
            <Unit activeLesson={undefined}  activeLessonPercentage={0} description={unit.description} id={unit.id} lessons={unit.lessons} order={unit.order} title={unit.title} />
          </div>
        ))}
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress activeCourse={userProgress.activeCourse} hasActiveSubscription={false} hearts={userProgress.hearts} points={userProgress.points} />
      </StickyWrapper>
    </div>
  )
}

export default LearnPage