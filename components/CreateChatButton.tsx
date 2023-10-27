'use client';

import { useRouter } from "next/navigation";
import { MessageSquarePlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useSubscriptionStore } from "@/store/store";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import LoadingSpinner from "./LoadingSpinner";
import { v4 as uuidv4 } from "uuid"
import { serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef } from "@/lib/converters/ChatMembers";

function CreateChatButton({ isLarge }: { isLarge?: boolean }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, seLoading] = useState(false);
    const { toast } = useToast();
    const subscription = useSubscriptionStore((state) => state.subscription)

    const createNewChat = async () => {
        if (!session?.user.id) return;

        seLoading(true);
        toast({
            title: "Creating new chat...",
            description: "hold tight while we create your new chat",
            duration: 3000,
        });

        //Check if user is pro and limit them creating a new chat
        //_______________________________________________________
        const chatId = uuidv4()


        await setDoc(addChatRef(chatId, session.user.id), {
            userId: session.user.id!,
            email: session.user.email!,
            timestamp: serverTimestamp(),
            isAdmin: true,
            chatId: chatId, 
            image: session.user.image || "",
        });




        router.push(`/chat/abc`)
    }
    if (isLarge)
        return (
            <div>
                <Button variant={"default"} onClick={createNewChat}>
                    {loading ? <LoadingSpinner /> : "create a New Chat"}
                </Button>
            </div>
        )
    return (
        <Button onClick={createNewChat} variant={"ghost"}>
            <MessageSquarePlusIcon />
        </Button>
    )
}

export default CreateChatButton