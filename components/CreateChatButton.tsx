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
            title: "Criando um novo chat...",
            description: "Aguarde enquanto criamos o seu novo chat.",
            duration: 3000,
        });

        //Check if user is pro and limit them creating a new chat
        //_______________________________________________________

        const noOfChats = (
            await getDocs(chatMembersCollectionsGroupRef(session.user.id))).docs.map((doc) => doc.data()).length

        const isPro = subscription?.role === "pro" && subscription.status === "active";

        if (!isPro && noOfChats >= 3) {
            toast({
                title: "Limite do plano gratuito excedido.",
                description: "Você excedeu o limite de chats do plano gratuito. Por favor, faça upgrade para o plano PRO para continuar adicionando usuários aos chats!",
                variant: "destructive",
                action: (
                    <ToastAction
                        altText="Upgrade"
                        onClick={() => router.push("/register")}>
                        Upgrade Para o PRO
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
                title: "Sucesso",
                description: "Seu chat foi criado.",
                className: "bg-green-400",
                duration: 2000,
            })
            router.push(`/chat/${chatId}`);

        }).catch((error) => {
            console.error(error);
            toast({
                title: "Erro",
                description: "Houve um erro ao criar o seu chat!",
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
                    {loading ? <LoadingSpinner /> : "Criar um Novo Chat"}
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