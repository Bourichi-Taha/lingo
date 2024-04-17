'use client';

import { challengeOptions, challengeProgress, challenges } from "@/database/schema";
import { useState, useTransition } from "react";
import Header from "./header";
import QuestionBubble from "./question-bubble";
import Challenge from "./challenge";
import Footer from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { wrongAnswer } from "@/actions/user-progress";

interface QuizeProps {
    initialPercentage: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {completed:boolean,challengeOptions:typeof challengeOptions.$inferSelect[]})[];
    initialHearts:number;
    userSubscription:{isActive:boolean} | undefined;
}

const Quize = (props:QuizeProps) => {

    const {initialHearts,initialLessonChallenges,initialLessonId,initialPercentage,userSubscription} = props;
    const [pending,startTransition] = useTransition();
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
    const onNext = () => {
      if (activeIndex === challenges.length - 1) {
        redirect("/learn");
      }
      setActiveIndex((prev)=>prev+1);
    }
    const onContinue = () => {
      if (!selectedOption) {
        return;
      }
      if (status === "wrong") {
        setStatus('none');
        setSelectedOption(undefined);
        return
      }
      if (status === "correct") {
        onNext();
        setStatus('none');
        setSelectedOption(undefined);
        return
      }
      const correctOption = options.find((option)=>option.correct) ;
      if (!correctOption) {
        return;
      }
      if (correctOption.id === selectedOption) {
        startTransition(() => {
          upsertChallengeProgress(activeChallenge.id).then((res)=>{
            if (res?.error === 'hearts') {
              return console.log("missing hearts")
            }
            setStatus("correct");
            setPercentage((prev)=> prev + 100 / challenges.length)
            //this is a practice
            if (initialPercentage === 100) {
              setHearts((prev=> Math.min(prev+1,5)));
            }
          }).catch(()=>{
            toast.error("Something went wrong, please try again!")
          });
        })
      }else{
        startTransition(() => {
          wrongAnswer(activeChallenge.id).then((res)=>{
            if (res?.error === 'hearts') {
              return console.log("missing hearts")
            }
            setStatus("wrong");
            if (!res?.error) {
              setHearts((prev=> Math.max(prev-1,0)));//this is not a practice
            }
          }).catch(()=>{
            toast.error("Something went wrong, please try again!")
          });
        })
      }
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
                <Challenge options={options} onSelect={onSelect} status={status} selectOption={selectedOption} disabled={pending || status !== "none"} type={activeChallenge.type} />
              </div>
            </div>
          </div>
        </div>
        <Footer disabled={!selectedOption || pending} status={status} onCheck={onContinue} />
    </>
  )
}

export default Quize