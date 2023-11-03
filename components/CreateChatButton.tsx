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
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef, chatMembersCollectionsGroupRef } from "@/lib/converters/ChatMembers";
import { ToastAction } from "./ui/toast";
import ChatsLayout from "@/app/(user)/layout";


function CreateChatButton({ isLarge }: { isLarge?: boolean }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const subscription = useSubscriptionStore((state) => state.subscription)

    const createNewChat = async () => {
        if (!session?.user.id) return;

        setLoading(true);
        toast({
            title: "Creating new chat...",
            description: "hold tight while we create your new chat",
            duration: 3000,
        });

        //Check if user is pro and limit them creating a new chat
        //_______________________________________________________

        const noOfChats = (
            await getDocs(chatMembersCollectionsGroupRef(session.user.id))).docs.map((doc) => doc.data()).length

        const isPro = subscription?.role === "pro" && subscription.status === "active";

        if (!isPro && noOfChats >= 3) {
            toast({
                title: "Free plan limit exceeded",
                description: "you´ve exceeded the limit of chats for FREE plan. please upgrade to PRO to continue adding users to chats!",
                variant: "destructive",
                action: (
                    <ToastAction
                        altText="Upgrade"
                        onClick={() => router.push("/register")}>
                        Upgrade To Pro
                    </ToastAction>
                ),
            });
            setLoading(false);

            return;
        }

        const chatId = uuidv4();

        await setDoc(addChatRef(chatId, session.user.id), {
            userId: session.user.id!,
            email: session.user.email!,
            timestamp: serverTimestamp(),
            isAdmin: true,
            chatId: chatId,
            image: session.user.image || "",
        }).then(() => {
            toast({
                title: "success",
                description: "your chat has been created",
                className: "bg-green-400",
                duration: 2000,
            })
            router.push(`/chat/${chatId}`);

        }).catch((error) => {
            console.error(error);
            toast({
                title: "Error",
                description: "There was an error creating you chat!",
                variant: "destructive",

            })
        }).finally(() => {
            setLoading(false)
        });





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