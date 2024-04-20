import FeedWrapper from '@/components/main/feed-wrapper'
import UserProgress from '@/components/main/learn/user-progress'
import Promo from '@/components/main/promo'
import StickyWrapper from '@/components/main/sticky-wrapper'
import { Progress } from '@/components/ui/progress'
import { getUserProgress, getUserSubscription } from '@/database/queries'
import { QUESTS } from '@/lib/constants'
import { Metadata } from 'next'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'


export const metadata: Metadata = {
    title: "Lingo | Quests",
    description: "Learn and have fun.",
  };

const QuestsPage = async () => {
    const userProgressPromise = getUserProgress();
    const userSubscriptionPromise = getUserSubscription();
    const [userProgress, userSubscription] = await Promise.all([userProgressPromise, userSubscriptionPromise]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

  const isPro = !!userSubscription?.isActive;


    return (
        <div className="flex gap-[48px] px-6">
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image src={'/quests.svg'} height={90} width={90} alt='Questse' />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Quests
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Complete quests by earning points.
                    </p>
                    <ul>
                        {
                            QUESTS.map((quest) => {
                                const progress = (userProgress.points / quest.value) * 100;

                                return (
                                    <div className="flex items-center w-full p-4 gap-x-4 border-t-2" key={quest.title}>
                                        <Image src={"/points.svg"} alt='Points' height={60} width={60} />
                                        <div className="flex flex-col gap-y-2 w-full">
                                            <p className="text-neutral-700 text-xl font-bold">
                                                {quest.title}
                                            </p>
                                            <Progress value={progress} className='h-3' />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </ul>

                </div>
            </FeedWrapper>
            <StickyWrapper>
                <UserProgress activeCourse={userProgress.activeCourse} hasActiveSubscription={isPro} hearts={userProgress.hearts} points={userProgress.points} />
                {!isPro && <Promo />}
            </StickyWrapper>
        </div>
    )
}

export default QuestsPage