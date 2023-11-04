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
import { Dispatch, SetStateAction } from "react";
import { useToast } from "./ui/use-toast";


function ShereLink({
    isOpen,
    chatId,
    setIsOpen
}: {
    isOpen: boolean;
    chatId: string;
    setIsOpen: Dispatch<SetStateAction<boolean>>
}) {

    const { toast } = useToast()
    const host = window.location.host;


    const linkToChat =
        process.env.NODE_ENV === "development"
            ? `https://${host}/chat/${chatId}`
            : `https://${host}/chat/${chatId}`;

    async function copyClipboard() {
        try {
            await navigator.clipboard.writeText(linkToChat);
            console.log("Texto copiado para a área de transferência.");

            toast({
                title: "Copiado com sucesso",
                description:
                    "Compartilhe isso com a pessoa com quem você deseja conversar! (OBSERVAÇÃO: eles devem ter sido adicionados ao chat para acessá-lo!",
                className: "bg-green-600 text-white"
            });
        } catch (err) {
            console.log("Falha ao copiar link", err)
        }


    }
    return (

        <Dialog
            onOpenChange={(open) => setIsOpen(open)}
            open={isOpen}
            defaultOpen={isOpen}
        >

            <DialogTrigger asChild>
                <Button variant="outline">
                    <Copy className="mr-2" />
                    Compartilhar Link
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Compartilhar Link
                    </DialogTitle>
                    <DialogDescription>
                        Qualquer usuário que tenha sido{" "}
                        <span className="text-indigo-600 font-bold">Concedido o acesso</span>{" "} Pode usar esse link
                    </DialogDescription>
                </DialogHeader>
                <div className="flex item-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            link
                        </Label>
                        <Input id="link" defaultValue={linkToChat} readOnly />
                    </div>;
                    <Button
                        type="submit"
                        onClick={() => copyClipboard()}
                        size="sm"
                        className="px-3">
                        <span className="sr-only">Copiar</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Fechar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ShereLink