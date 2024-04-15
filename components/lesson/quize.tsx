'use client';

import { challengeOptions, challengeProgress, challenges } from "@/database/schema";
import { useState } from "react";
import Header from "./header";
import QuestionBubble from "./question-bubble";
import Challenge from "./challenge";
import Footer from "./footer";

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
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex,setActiveIndex] = useState(()=>{
      const uncompletedIndex = challenges.findIndex((challenge)=>!challenge.completed);
      return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });
    const [selectedOption,setSelectedOption] = useState<number>();
    const [status,setStatus] = useState<"none"|"correct"|"wrong">("none");
    const activeChallenge = challenges[activeIndex];
    const options = activeChallenge?.challengeOptions || [];
    const question = activeChallenge.type === "ASSIST" ? "Select the correct meaning" : activeChallenge.question;

    const onSelect = (id:number) => {
      if (status !== "none") {
        return;
      }
      setSelectedOption(id);
    }
  return (
    <>
        <Header hearts={hearts} percentage={percentage} hasActiveSubscription={!!userSubscription?.isActive} />
        <div className="flex-1">
          <div className="h-full flex items-center justify-center">
            <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
              <h1 className="text-lg lg:text-3xl text-center lg:text-center font-bold text-neutral-700">
                {
                  question
                }
              </h1>
              <div className="">
                {
                  activeChallenge.type === "ASSIST" && (
                    <QuestionBubble question={activeChallenge.question} />
                  )
                }
                <Challenge options={options} onSelect={onSelect} status={status} selectOption={selectedOption} disabled={false} type={activeChallenge.type} />
              </div>
            </div>
          </div>
        </div>
        <Footer disabled={!selectedOption} status={status} onCheck={()=>{}} />
    </>
  )
}

export default Quize