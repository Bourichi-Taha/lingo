import { Metadata } from "next";

interface LEssonLayoutProps {
    children: React.ReactNode;
}
export const metadata: Metadata = {
    title: "Lingo | Quize",
    description: "Learn and have fun.",
  };
const LessonLayout = (props: LEssonLayoutProps) => {
    const { children } = props;
    return (
        <div className="flex flex-col h-full ">
            <div className="flex flex-col h-full w-full">
                {children}
            </div>
        </div>
    )
}

export default LessonLayout