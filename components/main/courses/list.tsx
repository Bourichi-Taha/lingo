'use client';

import { courses } from "@/database/schema";
import Card from "./card";

interface ListProps {
    courses: typeof courses.$inferSelect[];
    activeCourseId: number;
}

const List = (props:ListProps) => {
    const {activeCourseId,courses} = props;

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
        {
            courses.map((course,index) => {
                return (
                    <Card key={index} id={course.id} title={course.title} imageSrc={course.imageSrc} onClick={()=>{}} disabled={false} active={course.id === activeCourseId}  />
                )
            })
        }
    </div>
  )
}

export default List