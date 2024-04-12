import FeedWrapper from '@/components/main/feed-wrapper'
import Header from '@/components/main/learn/header'
import UserProgress from '@/components/main/learn/user-progress'
import StickyWrapper from '@/components/main/sticky-wrapper'
import { getUserProgress } from '@/database/queries'
import { redirect } from 'next/navigation'
import React from 'react'

const LearnPage =async () => {
  const userProgressPromise = getUserProgress();
  const [userProgress] = await Promise.all([userProgressPromise]);
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  return (
    <div className="flex gap-[48px] px-6">
      <FeedWrapper>
        <Header title='Spanish' />
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress activeCourse={userProgress.activeCourse} hasActiveSubscription={false} hearts={userProgress.hearts} points={userProgress.points} />
      </StickyWrapper>
    </div>
  )
}

export default LearnPage