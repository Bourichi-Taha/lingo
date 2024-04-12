import FeedWrapper from '@/components/main/feed-wrapper'
import Header from '@/components/main/learn/header'
import UserProgress from '@/components/main/learn/user-progress'
import StickyWrapper from '@/components/main/sticky-wrapper'
import React from 'react'

const LearnPage = () => {
  return (
    <div className="flex gap-[48px] px-6">
      <FeedWrapper>
        <Header title='Spanish' />
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress activeCourse={{title:'Spanish',src:'/es.svg'}} hasActiveSubscription={false} hearts={5} points={100} />
      </StickyWrapper>
    </div>
  )
}

export default LearnPage