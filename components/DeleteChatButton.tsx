'use client'


'use client'

import { Copy } from "lucide-react";
import { Button } from "./ui/button";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dispatch, SetStateAction, useState } from "react";
import { useToast } from "./ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useAdminId from "@/hooks/useAdminId";


function DeleteChatButton({ chatId }: { chatId: string }) {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const adminId = useAdminId({ chatId })

    const handleDelete = async () => {
        toast({
            title: "Deletando chat",
            description: "Por favor aguarde enquanto deletamos seu chat....",
        })
        console.log("Deletando::", chatId)

        await fetch("/api/chat/delete", {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ chatId: chatId }),
        }).then((res) => {
            toast({
                title: "Sucesso",
                description: "Seu chat foi deletado",
                className: "bg-green-600 text-white",
                duration: 3000,
            });
            router.replace(`/chat`)
        }).catch((err) => {
            console.error(err.message);
            toast({
                title: "Erro",
                description: "Houve um erro ao deletar o seu chat!",
                variant: "destructive",
            });
        })
            .finally(() => setOpen(false));
    }



    return (
        session?.user.id === adminId && (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="destructive">Deletar chat</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Tem certeza?</DialogTitle>
                        <DialogDescription>
                            Isso irá excluir o chat para todos os usuários.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-2 space-x-2">
                        <Button variant={"destructive"} onClick={handleDelete}>
                            Deletar
                        </Button>

                        <Button variant={"outline"} onClick={() => setOpen(false)}>Cancelar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    )

}

export default DeleteChatButton