import { challengeOptions, challenges } from "@/database/schema"
import { cn } from "@/lib/utils";
import Card from "./card";

interface ChallengeProps {
    options: typeof challengeOptions.$inferSelect[];
    onSelect: (id: number) => void;
    status: "correct" | "wrong" | "none";
    selectOption?: number;
    disabled?: boolean;
    type: typeof challenges.$inferSelect.type;
}

const Challenge = (props: ChallengeProps) => {

    const { onSelect, options, status, type, disabled, selectOption } = props;

    return (
        <div className={cn("grid gap-2", type === "ASSIST" && "grid-cols-1", type === "SELECT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]")}>
            {
                options.map((option, index) =>
                (
                    <Card key={option.id} id={option.id} text={option.text} imageSrc={option.imageSrc} shortcut={`${index + 1}`} selected={selectOption === option.id} onClick={()=>onSelect(option.id)} status={status} audioSrc={option.audioSrc} disabled={disabled} type={type} />
                )
                )
            }
        </div>
    )
}

export default Challenge