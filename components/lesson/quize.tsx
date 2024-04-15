'use client';

import { challengeOptions, challengeProgress, challenges } from "@/database/schema";
import { useState } from "react";
import Header from "./header";

interface QuizeProps {
    initialPercentage: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {completed:boolean,challengeOptions:typeof challengeOptions.$inferSelect[]})[];
    initialHearts:number;
    userSubscription:{isActive:boolean} | undefined;
}

const Quize = (props:QuizeProps) => {

    const {initialHearts,initialLessonChallenges,initialLessonId,initialPercentage,userSubscription} = props;
    const [hearts,setHearts] = useState(initialHearts);
    const [percentage,setPercentage] = useState(initialPercentage);
  return (
    <>
        <Header hearts={hearts} percentage={percentage} hasActiveSubscription={!!userSubscription?.isActive} />
    </>
  )
}

export default Quize