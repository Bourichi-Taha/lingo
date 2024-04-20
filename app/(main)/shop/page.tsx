import FeedWrapper from '@/components/main/feed-wrapper'
import UserProgress from '@/components/main/learn/user-progress'
import Promo from '@/components/main/promo'
import Quests from '@/components/main/quests'
import Items from '@/components/main/shop/items'
import StickyWrapper from '@/components/main/sticky-wrapper'
import { getUserProgress, getUserSubscription } from '@/database/queries'
import { Metadata } from 'next'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
export const metadata: Metadata = {
    title: "Lingo | Shop",
    description: "Learn and have fun.",
  };
const ShopPage = async () => {
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
                    <Image src={'/shop.svg'} height={90} width={90} alt='Shope' />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Shop
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Spend your points on cool stuff.
                    </p>
                    <Items hasActiveSubscription={isPro} hearts={userProgress.hearts} points={userProgress.points} />
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

export default ShopPage