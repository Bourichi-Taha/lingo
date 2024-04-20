import FeedWrapper from '@/components/main/feed-wrapper'
import UserProgress from '@/components/main/learn/user-progress'
import Promo from '@/components/main/promo'
import Quests from '@/components/main/quests'
import StickyWrapper from '@/components/main/sticky-wrapper'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { getTopTenUsers, getUserProgress, getUserSubscription } from '@/database/queries'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const LeaderboardPage = async () => {
    const userProgressPromise = getUserProgress();
    const userSubscriptionPromise = getUserSubscription();
    const topTenUsersPromise = getTopTenUsers();
    const [userProgress, userSubscription, topTenUsers] = await Promise.all([userProgressPromise, userSubscriptionPromise, topTenUsersPromise]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    const isPro = !!userSubscription?.isActive;


    return (
        <div className="flex gap-[48px] px-6">
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image src={'/leaderboard.svg'} height={90} width={90} alt='Leaderboarde' />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Leaderboard
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        See where you stand among other learners in the community.
                    </p>
                    <Separator className='mb-4 h-0.5 rounded-full' />
                    {
                        topTenUsers.map((progress, index) => (
                            <div key={index} className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50">
                                <p className="font-bold text-lime-700 mr-4">{index + 1}</p>
                                <Avatar className='border bg-green-500 h-12 w-12 ml-3 mr-6'>
                                    <AvatarImage src={progress.userImageSrc} className='object-cover' />
                                </Avatar>
                                <p className="font-bold text-neutral-800 flex-1">{progress.username}</p>
                                <p className="text-muted-foreground">{progress.points} XP</p>
                            </div>
                        ))
                    }
                </div>
            </FeedWrapper>
            <StickyWrapper>
                <UserProgress activeCourse={userProgress.activeCourse} hasActiveSubscription={isPro} hearts={userProgress.hearts} points={userProgress.points} />
                {!isPro && <Promo />}
                <Quests points={userProgress.points} />

            </StickyWrapper>
        </div>
    )
}

export default LeaderboardPage