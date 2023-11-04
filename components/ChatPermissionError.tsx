import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import Link from "next/link"
import { Button } from "./ui/button"


function ChatPermissionError() {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex">
                <p className="flex-1">
                    Você não tem permissão para visualizar este chat.
                    <br />
                    <span className="font-bold">
                        Por favor, peça ao administrador do chat para te adicionar ao chat.
                    </span>
                </p>
                <Link href="chat" replace>
                    <Button variant="destructive">
                        Ignorar
                    </Button>
                </Link>
            </AlertDescription>
        </Alert>
    )
}

export default ChatPermissionError