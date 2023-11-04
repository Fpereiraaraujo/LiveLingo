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
import ShereLink from "./ShereLink";



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
            title: "Enviar convite",
            description: "Por favor aguarde enquanto enviamos o convite"
        });


        const noOfUsersInChat = (await getDocs(chatMembersRef(chatId))).docs.map((doc) => doc.data()).length;


        const isPro = subscription?.role === "pro" && subscription.status === "active";


        if (!isPro && noOfUsersInChat >= 2) {
            toast({
                title: "Limite do plano gratuito excedido.",
                description: "Você excedeu o limite de chats do plano gratuito. Por favor, faça upgrade para o plano PRO para continuar criando chats",
                variant: "destructive",
                action: (
                    <ToastAction
                        altText="Upgrade"
                        onClick={() => router.push("/register")}>
                        Upgrade para o PRO
                    </ToastAction>
                )
            });
            return;
        }
        const querySnapshot = await getDocs(getUserByEmailRef(values.email));


        if (querySnapshot.empty) {
            toast({
                title: "usuário não encontrado",
                description: "Por favor digite um email valido",
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
                    title: "Adicionado ao chat",
                    description: "O usuário foi adicionado ao chat",
                    className: "bg-green-600 text-white",
                    duration: 3000,
                })
                setOpenInviteLink(true)
            })
                .catch(() => {
                    toast({
                        title: "Erro",
                        description: "Ops... ocorreu um erro ao adicionar o usuário ao chat!",
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
                            Adicionar Usuário ao chat
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Adicionar Usuário ao chat</DialogTitle>
                            <DialogDescription>
                                Basta inserir o endereço de e-mail de outro usuario para convida-lo para este chat!, {" "}
                                <span className="text-indigo-600 font-bold">
                                    (Nota: eles devem estar registrados.)
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
                                <Button className="ml-auto sm:w-fit w-full " type="submit">Adicionar</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>

                <ShereLink
                    isOpen={openInviteLink}
                    setIsOpen={setOpenInviteLink}
                    chatId={chatId} />
            </>
        )
    );
}

export default InviteUser