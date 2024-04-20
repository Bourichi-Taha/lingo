import { auth } from "@clerk/nextjs"


export const getIsAdmin =  () => {
    const {userId} =  auth();
    if (!userId) {
        return false;
    }
    return "user_2exie5yqgOIZDZcRCvdf64dswEI" === userId;
}