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

    const handleDelete = async () =>{
        toast({
            title:"Deleting chat",
            description:"Please wait while we delte the chat...",
        })
        console.log("Deleting::",chatId)

    }



    return (
        session?.user.id === adminId && (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="destructive">Delete chat</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            this will delete the chat for all users.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-2 space-x-2">
                        <Button variant={"destructive"} onClick={handleDelete}>
                            Delete
                        </Button>

                        <Button variant={"outline"} onClick={() => setOpen(false)}>Cancel
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    )
    
}

export default DeleteChatButton