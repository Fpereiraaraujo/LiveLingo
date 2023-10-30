'use client'

import { Form, FormControl, FormField, FormMessage, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { LimitedMessagesRef, User, messagesRef } from "@/lib/converters/Message";
import { Subscript, SubscriptIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/store/store";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";




const formSchema = z.object({
    input: z.string().max(1000),
});


function ChatInput({ chatId }: { chatId: string }) {
    const { data: session } = useSession();
    const router = useRouter();
    const subscription = useSubscriptionStore((state) => state.subscription)
    const { toast } = useToast();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: "",
        },
    });


    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.input.length === 0) {
            return;
        }
        if (!session?.user) {
            return;
        }

        //Check if user is pro and limit them creating a new chat
        //_______________________________________________________

        const messages = (await getDocs(LimitedMessagesRef(chatId))).docs.map((doc) => doc.data()).length;


        const isPro = subscription?.role === "pro" && subscription.status === "active";

        if (!isPro && messages >= 20) {
            toast({
                title: "Free Plan Limited Exceeded",
                description: "exceded the plan",
                variant: "destructive",
                action: (
                    <ToastAction
                        altText="Upgrade"
                        onClick={() => router.push("/register")} >
                        Update To pro
                    </ToastAction >
                ),
            });

            return;
        }




        const userToStore: User = {
            id: session.user.id!,
            name: session.user.name!,
            email: session.user.email!,
            image: session.user.image || "",
        };

        addDoc(messagesRef(chatId), {
            input: values.input,
            timeStamp: serverTimestamp(),
            user: userToStore,
        })
    }


    return (
        <div className="sticky button-0">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="flex space-x-2 p-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800"
                >
                    <FormField
                        control={form.control}
                        name="input"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input className="border-none bg-t-transparent dark:placeholder:text-white/70"
                                        placeholder="Enter Message In ANY language..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="bg-violet-600 text-white">Send
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default ChatInput