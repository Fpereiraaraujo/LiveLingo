'use client'

import { useSession } from "next-auth/react";
import * as z from "zod"
import { useToast } from "./ui/use-toast";
import useAdminId from "@/hooks/useAdminId";
import { useSubscriptionStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef, chatMembersRef } from "@/lib/converters/ChatMembers";
import { ToastAction } from "./ui/toast";
import { getUserByEmailRef } from "@/lib/converters/User";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";



const formSchema = z.object({
    email: z.string().email("plase enter a valid email address")
})

function InviteUser({ chatId }: { chatId: string }) {

    const { data: session } = useSession();
    const { toast } = useToast();
    const adminId = useAdminId({ chatId });
    const subscription = useSubscriptionStore((state) => state.subscription);
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [openInviteLink, setOpenInviteLink] = useState(false)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }

    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!session?.user.id) return;

        toast({
            title: "Sending Invite",
            description: "Please wait while we send the invite"
        });


        const noOfUsersInChat = (await getDocs(chatMembersRef(chatId))).docs.map((doc) => doc.data()).length;


        const isPro = subscription?.role === "pro" && subscription.status === "active";


        if (!isPro && noOfUsersInChat >= 2) {
            toast({
                title: "Free plan limit exceeded",
                description: "you have exceed blablabla",
                variant: "destructive",
                action: (
                    <ToastAction
                        altText="Upgrade"
                        onClick={() => router.push("/register")}>
                        Upgrade to PRO
                    </ToastAction>
                )
            });
            return;
        }
        const querySnapshot = await getDocs(getUserByEmailRef(values.email));


        if (querySnapshot.empty) {
            toast({
                title: "User not Found",
                description: "Please enter an email valid",
                variant: "destructive",
            })

            return;
        } else {
            const user = querySnapshot.docs[0].data();

            await setDoc(addChatRef(chatId, user.id), {
                userId: user.id!,
                email: user.email!,
                timestamp: serverTimestamp(),
                chatId: chatId!,
                isAdmin: false,
                image: user.image || "",
            }).then(() => {
                setOpen(false);


                toast({
                    title: "Added to chat",
                    description: "the user has been adeed blablabla",
                    className: "bg-green-600 text-white",
                    duration: 3000,
                })
                setOpenInviteLink(true)
            })
                .catch(() => {
                    toast({
                        title: "Error",
                        description: "Whoops...there was an error adding the user to the chat!",
                        variant: "destructive"
                    })
                })
        }
        form.reset()
    }

    return (
        adminId === session?.user.id && (
            <>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircleIcon className="mr-1" />
                            Add User To Chat
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add User to Chat</DialogTitle>
                            <DialogDescription>
                                Simply enter another users email address to invite them to this chat!{" "}
                                <span className="text-indigo-600 font-bold">
                                    (Note:the mus be registred)
                                </span>
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col space-y-2"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="john@doe.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="ml-auto sm:w-fit w-full " type="submit">Add To chat</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>

                {/*<ShereLink
                    isOpne={openInviteLink}
                    setidOpen={setOpenInviteLink}
                                    chatId={chatId} />*/}
            </>
        )
    );
}

export default InviteUser