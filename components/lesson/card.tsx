import { challenges } from "@/database/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CardProps {
    id: number;
    text: string;
    imageSrc: string | null;
    audioSrc: string | null;
    shortcut: string;
    selected: boolean | null;
    onClick: () => void;
    status?: "correct" | "wrong" | "none";
    disabled?: boolean;
    type: typeof challenges.$inferSelect.type;
}

const Card = (props: CardProps) => {
    const { audioSrc, disabled, id, imageSrc, onClick, selected, shortcut, status, text, type } = props;




    return (
        <div className={cn("h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2", selected && "border-sky-300 bg-sky-100 hover:bg-sky-100", selected && status === "correct" && "border-green-300 bg-green-100 hover:bg-green-100", selected && status === "wrong" && "border-rose-300 bg-rose-100 hover:bg-rose-100", disabled && "pointer-events-none hover:bg-white", type === "ASSIST" && "lg:p-3 w-full")} onClick={() => { }}>
            {
                imageSrc && (
                    <div className="relative -mt-8 max-h-[120px] lg:max-h-[150px] w-full flex items-center justify-center">
                        <Image src={imageSrc} height={100} width={100} alt={text} />
                    </div>
                )
            }
            <div className={cn("mt-6 flex items-center justify-between", type === "ASSIST" && "flex-row-reverse",)}>
                {type === "ASSIST" && <div />}
                <p className={cn("text-neutral-600 text-sm lg:text-base", selected && "text-sky-500", selected && status === "correct" && "text-green-500", selected && status === "wrong" && "text-rose-500")}>
                    {text}
                </p>
                <div className={cn("lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-xs font-semibold",selected && "border-sky-300 text-sky-500",selected && status === "correct" && "border-green-500 text-green-500",selected && status === "wrong" && "border-rose-500 text-rose-500")}>
                    {shortcut}
                </div>
            </div>
        </div>
    )
}

export default Card